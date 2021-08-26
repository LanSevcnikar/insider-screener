const fetch = require("node-fetch");
const Threader = require("./threader");
const Timestamp = require("unix-timestamp")

const threader = new Threader();

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function get_prices(index) {
  console.log("started with", index);
  await sleep(Math.random() * 1000 + 1000);
  console.log("finished with", index);
}

async function _main() {
  for (let i = 0; i < 20; i += 1) {
    threader.addToQueue({ action: get_prices, args: [i] });
  }

  threader.run_threads(3);
}

for (let i = 0; i < 1; i++) {
  const ticker = "AMZN";
  const start = Timestamp.fromDate("2010-01-01");
  const stop = Timestamp.fromDate("2021-08-25");

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
    res.chart.result[0].timestamp.forEach((date,  index) => {
      console.log(
        index,
        Timestamp.toDate(date),
        res.chart.result[0].indicators.adjclose[0].adjclose[index]
      )
    });
  });

}
