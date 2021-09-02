CREATE TABLE is_past_trades (
	trade_id serial PRIMARY KEY,
  trade_date DATE NOT NULL,
  filing_date DATE,
  buyer_titles VARCHAR ( 40 ) [] NOT NULL,
  buyer_name VARCHAR ( 200 ) NOT NULL,
  comp_sector VARCHAR ( 200 ) NOT NULL,
  comp_subsector VARCHAR ( 200 ) NOT NULL,
  comp_industry VARCHAR ( 200 ) NOT NULL,
  comp_name VARCHAR ( 200 ) NOT NULL,
  stock_ticker VARCHAR ( 20 ) NOT NULL,
  stock_id INT,
  stock_price NUMERIC,
  stock_quantity INT NOT NULL,
  stock_new_ownership INT NOT NULL
)

INSERT INTO is_past_trades (
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
  '2020-6-8',
  '2020-3-7',
  '{"CEO", "HE"}',
  'Joe Dough',
  'Mum',
  'Your mum',
  'Sex',
  'HavingSexWithMums',
  'HSWM',
  null,
  3.16,
  69,
  420
)