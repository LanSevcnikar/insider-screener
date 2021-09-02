CREATE TABLE is_past_prices (
	stock_id serial PRIMARY KEY,
  stock_ticker VARCHAR ( 20 ) NOT NULL,
  price_history JSON NOT NULL
)

INSERT INTO is_past_prices (stock_ticker, price_history)
VALUES ('AMZN', '{"17-03-2020": "17"}')