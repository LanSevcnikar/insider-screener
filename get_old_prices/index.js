const fetch = require("node-fetch");
const Timestamp = require("unix-timestamp")
const { Pool } = require("pg");
const fsp = require("fs").promises;
const fs = require("fs");
const { mainModule } = require("process");

const stream = fs.createWriteStream("log.txt");
let pool = null;

async function get_prices(ticker) {
  const start = Timestamp.fromDate("2010-01-01");
  const stop = Timestamp.fromDate("2021-08-28");

  const url = `
    https://query2.finance.yahoo.com/v8/finance/chart/${ticker}
    ?formatted=true
    &crumb=hIGzkY.KjVk
    &lang=en-US
    &region=US
    &includeAdjustedClose=true
    &interval=1d
    &period1=${start}
    &period2=${stop}
    &events=capitalGain%7Cdiv%7Csplit
    &useYfid=true
    &corsDomain=finance.yahoo.com`
    .split(' ').join('').split("\n").join("")

  fetch(url).then(res => res.json()).then(res => {
    console.log("Successful fetch")
    let prices_json = {};
    res.chart.result[0].timestamp.forEach((date, index) => {
      const price_value = res.chart.result[0].indicators.adjclose[0].adjclose[index];
      prices_json[date] = price_value;
    });
    pool.query(
      `INSERT INTO is_past_prices (stock_ticker, price_history) VALUES ($1, $2)`,
      [ticker, prices_json]
    )
  });

}

async function _main() {
  const data = await fsp.readFile('../psql_password')
  pool = new Pool({
    user: "lansev",
    host: "192.168.1.4",
    database: "insider-screener",
    password: data,
    port: 5432,
  });

  pool.query('select distinct stock_ticker from is_past_trades;').then(res => {
    res.rows.forEach(row => {
      get_prices(row.stock_ticker)
      console.log(row.stock_ticker)
    });
  })

}

_main()
