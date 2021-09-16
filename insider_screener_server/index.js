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

app.post('/getqueryparams', async (req, res) => {
  const column_param = req.body.column_param;
  const query_params = req.body.query_params;


  let query_string = ``;
  if (['trade_date', 'filing_date', 'stock_total'].indexOf(column_param) >= 0) {
    if (column_param == 'stock_total') {

      query_string = `SELECT MIN(stock_price * stock_quantity), max(stock_price * stock_quantity) FROM is_past_trades WHERE`
    } else {

      query_string = `SELECT MIN(${column_param}), max(${column_param}) FROM is_past_trades WHERE`
    }
  } else {
    query_string = `SELECT DISTINCT ${column_param} from is_past_trades WHERE`
  }
  let number_of_args = 0;

  //! THIS IS ALL BUILDING UP THE QUERY

  // buyer_name and comp_info
  const query_options = [
    "buyer_name",
    "comp_subsector",
    "comp_industry",
    "comp_name",
  ]
  query_options.forEach(option => {
    if (option != column_param) {
      if (query_params[option] && query_params[option].length) {
        if (number_of_args) query_string += ' AND ';
        let string_array = '('
        query_params[option].forEach(param => {
          string_array += ` '${param}',`
        });
        string_array = string_array.slice(0, -1);
        string_array += ')';
        query_string += ` (${option} IN ${string_array}) `
        number_of_args += 1;
      }
    }
  });

  //buyer titles
  if (column_param != 'buyer_titles') {
    if (query_params['buyer_titles'] && query_params['buyer_titles'].length) {
      if (number_of_args) query_string += ' AND ';
      let string_array = '['
      query_params['buyer_titles'].forEach(param => {
        string_array += ` '${param}',`
      });
      string_array = string_array.slice(0, -1);
      string_array += ']';
      query_string += `( buyer_titles && ARRAY${string_array} )`
      number_of_args += 1;
    }
  }

  if (!number_of_args) query_string += ' true ';
  query_string += ';'

  console.log(query_string)

  const query_res = await pool.query(query_string);


  //! THIS IS ALL BUILDING UP THE RESPONSE JSON
  //if dates or total value
  if (['trade_date', 'filing_date', 'stock_total'].indexOf(column_param) >= 0) {
    const minmaxvalues = {
      min: query_res.rows[0].min,
      max: query_res.rows[0].max,
    }
    res.json(minmaxvalues);
    return;
  }

  // if buyer_name and comp_info
  if (query_options.indexOf(column_param) >= 0) {
    let distinct_options = [];
    query_res.rows.forEach(row => {
      distinct_options.push(row[column_param]);
    });
    res.json(distinct_options)
    return;
  }


  // buyer titles
  let distinct_title_arrays = [];
  query_res.rows.forEach(row => {
    row[column_param].forEach(title => {
      distinct_title_arrays.push(title);
    })
  });

  const distinct_titles = distinct_title_arrays.filter((value, index, self) => {
    return self.indexOf(value) === index;
  })
  res.json(distinct_titles)
})

app.post('/getpp', async (req, res) => {
  console.log("getpp called => ", req.body)
  const query_res = await pool.query("select price_history from is_past_prices where stock_ticker = $1;", [req.body.stock_id]);
  res.send(query_res)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})