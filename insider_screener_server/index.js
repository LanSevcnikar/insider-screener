const express = require('express')
const bodyParser = require('body-parser');
const fs = require('fs')
const { Pool } = require('pg')
var cors = require('cors')

const app = express()
app.use(bodyParser.json());
app.use(cors())

const port = 3000

fs.readFile('../psql_password', 'utf8', (err, data) => {
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

app.post('/searchdb', async (req, res) => {
  console.log("searchdb called => ", req.body.query)
  const query_res = await pool.query(req.body.query);
  res.send(query_res)
})

app.post('/getpp', async (req, res) => {
  console.log("getpp called => ", req.body)
  const query_res = await pool.query("select price_history from is_past_prices where stock_ticker = $1;",[req.body.stock_id]);
  res.send(query_res)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})