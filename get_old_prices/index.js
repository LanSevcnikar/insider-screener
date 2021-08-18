const fetch = require("node-fetch");
const Threader = require("./threader");

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

for(let i = 0; i < 1; i++){

  const url =  "https://query2.finance.yahoo.com/v8/finance/chart/SUI?formatted=true&crumb=hIGzkY.KjVk&lang=en-US&region=US&includeAdjustedClose=true&interval=1d&period1=1009843200&period2=1628640000&events=capitalGain%7Cdiv%7Csplit&useYfid=true&corsDomain=finance.yahoo.com"
  fetch(url).then(res => res.json()).then(res => console.log(res.chart.result[0].timestamp[res.chart.result[0].timestamp.length-1]));

}

