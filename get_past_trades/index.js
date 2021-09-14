const http = require("http");
const Threader = require("../my_packages/threader");
const HtmlTableToJson = require("html-table-to-json");
const fs = require("fs");
const { Pool } = require("pg");

const search_data = require("./search_data");
const stream = fs.createWriteStream("log.txt");
let pool = null;

function get_trades(sector_index, subsector_index, page_index, industry_index) {
  const url = `http://openinsider.com/screener?s=&o=&pl=&ph=&ll=&lh=&fd=0&fdr=&&td=-1&tdr=01%2F01%2F2010+-+08%2F28%2F2021&fdlyl=&fdlyh=&daysago=&xp=1&vl=&vh=&ocl=&och=&sic1=${search_data.SECTOR_CODES[sector_index]
    }&sic2=${search_data.SUBSECTOR_CODES[sector_index][subsector_index]}&sic3=${search_data.INDUSTRY_CODES[industry_index]
    }&sicl=${search_data.INDUSTRY_CODES[industry_index]}&sich=${search_data.INDUSTRY_CODES[industry_index + 1] - 1
    }&isofficer=1&iscob=1&isceo=1&ispres=1&iscoo=1&iscfo=1&isgc=1&isvp=1&isdirector=1&istenpercent=1&isother=1&grp=0&nfl=&nfh=&nil=&nih=&nol=&noh=&v2l=&v2h=&oc2l=&oc2h=&sortcol=0&cnt=5000&page=${page_index}`;

  console.log(url)
  stream.write(url + '\n')

  return new Promise((resolve, reject) => {
    let trades_string = "";
    let trades_json = null;
    http.get(url, (res) => {
      res.on("data", (chunk) => (trades_string += chunk));
      res.on("end", () => {
        trades_json = HtmlTableToJson.parse(
          "<table>" +
          trades_string.split("<table")[12].split("</table>")[0] +
          "</table>"
        ).results;
        resolve(trades_json[0]);
      });
      res.on("error", (e) => {
        reject(e);
      });
    });
  });
}

function add_trades_to_db(
  trades,
  sector_index,
  subsector_index,
  industry_name
) {
  let promises = [];

  console.log(trades.length)
  stream.write(trades.length.toString() + '  -->  ')

  trades.forEach((trade) => {
    const filing_date = trade["Filing Date"].split(" ")[0];
    const trade_date = trade["Trade Date"];
    const ticker = trade["Ticker"];
    const buyer_name = trade["Insider Name"];
    const comp_name = trade["Company Name"];
    const titles = trade["Title"].split(", ");
    const price = parseFloat(trade["Price"].substring(1, 50));
    const quant = parseInt(trade["Qty"].substring(1, 50).replace(",", ""));
    const owned = parseInt(trade["Owned"].replace(",", ""));

    console.log( search_data.SECTOR_NAMES[sector_index])

    promises.push(
      new Promise((resolve, reject) => {
        pool.query(
          `INSERT INTO is_past_trades (
            trade_date, 
            filing_date, 
            buyer_titles, 
            buyer_name, 
            comp_sector, 
            comp_subsector, 
            comp_industry, 
            comp_name, 
            stock_ticker,
            stock_id,
            stock_price,
            stock_quantity,
            stock_new_ownership
          ) VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            $10,
            $11,
            $12,
            $13
          )`,
          [
            trade_date,
            filing_date,
            titles,
            buyer_name,
            search_data.SECTOR_NAMES[sector_index],
            search_data.SUBSECTOR_NAMES[sector_index][subsector_index],
            industry_name,
            comp_name,
            ticker,
            null,
            price,
            quant,
            owned,
          ],
          (err, res) => {
            if (err) {
              console.log("ERROR HAPPENED", err);
              reject(err);
            } else resolve(ticker);
          }
        );
      })
    );
  });
  return Promise.all(promises);
}

async function _main() {
  await fs.readFile('../psql_password', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    pool = new Pool({
      user: "lansev",
      host: "192.168.1.3",
      database: "insider-screener",
      password: data,
      port: 5432,
    });
  })

  for (let i = 6; i < search_data.INDUSTRY_NAMES.length; i++) {
    const industry_code = search_data.INDUSTRY_CODES[i];
    const industry_name = search_data.INDUSTRY_NAMES[i];

    const sector_index =
      search_data.SECTOR_CODES.indexOf(
        search_data.SECTOR_CODES.find((sector) => sector > industry_code / 100)
      ) - 1;
    const subsector_index =
      search_data.SUBSECTOR_CODES[sector_index].indexOf(
        search_data.SUBSECTOR_CODES[sector_index].find(
          (subsector) => subsector > industry_code / 100
        )
      ) - 1;

    try {
      let page_index = 1;
      let trades = null;
      do {
        trades = await get_trades(sector_index, subsector_index, page_index, i);

        await add_trades_to_db(
          trades,
          sector_index,
          subsector_index,
          industry_name
        );

        console.log("done with ", industry_name, page_index);
        stream.write("Done with " + industry_name + " on page " + page_index.toString() + "\n\n")
        page_index += 1;
      } while (trades.length == 5000 && page_index != 10);
    } catch (e) {
      console.log("ERROR HAPPENED 101", e);
    }
  }
}

_main();
