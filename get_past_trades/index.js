const http = require("http");
const HtmlTableToJson = require("html-table-to-json");
const fs = require("fs");
const { Pool } = require("pg");

const search_data = require("./search_data");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "insider_screener",
  password: "password",
  port: 5432,
});

function get_trades(sector_index, subsector_index, page_index, industry_index) {
  const url = `http://openinsider.com/screener?s=&o=&pl=&ph=&ll=&lh=&fd=0&fdr=&td=0&tdr=&fdlyl=&fdlyh=&daysago=&xp=1&vl=&vh=&ocl=&och=&sic1=${
    search_data.SECTOR_CODES[sector_index]
  }&sic2=${search_data.SUBSECTOR_CODES[sector_index][subsector_index]}&sic3=${
    search_data.INDUSTRY_CODES[industry_index]
  }&sicl=${search_data.INDUSTRY_CODES[industry_index]}&sich=${
    search_data.INDUSTRY_CODES[industry_index + 1] - 1
  }&isofficer=1&iscob=1&isceo=1&ispres=1&iscoo=1&iscfo=1&isgc=1&isvp=1&isdirector=1&istenpercent=1&isother=1&grp=0&nfl=&nfh=&nil=&nih=&nol=&noh=&v2l=&v2h=&oc2l=&oc2h=&sortcol=0&cnt=5000&page=${page_index}`;

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

  trades.forEach((trade) => {
    const filing_date = trade["Filing Date"].split(" ")[0];
    const trade_date = trade["Trade Date"];
    const ticker = trade["Ticker"];
    const titles = trade["Title"].split(", ");
    const price = parseFloat(trade["Price"].substring(1, 50));
    const quant = parseInt(trade["Qty"].substring(1, 50).replace(",", ""));
    const owned = parseInt(trade["Owned"].replace(",", ""));

    promises.push(
      new Promise((resolve, reject) => {
        pool.query(
          `insert into is_past_trades 
                (date_filling, date_trade, stock_ticker, buyer_title, stock_price, stock_quantity, stock_new_ownership, comp_sector, comp_subsector, comp_industry) 
                values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
          [
            filing_date,
            trade_date,
            ticker,
            titles,
            price,
            quant,
            owned,
            search_data.SECTOR_NAMES[sector_index],
            search_data.SUBSECTOR_NAMES[sector_index][subsector_index],
            industry_name,
          ],
          (err, res) => {
            if (err) {
              console.log(
                "ERROR HAPPENED " +
                  trade_date +
                  ticker +
                  JSON.stringify(err) +
                  "\n"
              );
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
  for (let i = search_data.INDUSTRY_NAMES.indexOf('State Commercial Banks')+1; i < search_data.INDUSTRY_NAMES.length; i++) {
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
        page_index += 1;
      } while (trades.length == 5000);
    } catch (e) {
      console.log("ERROR HAPPENED 101", e);
    }
  }
}

_main();
