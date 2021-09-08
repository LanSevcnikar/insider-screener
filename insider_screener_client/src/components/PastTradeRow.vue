<template>
  <tr @click="change_state()">
    <th scope="row">{{ index + 1 }}</th>
    <td>{{ trade_date }}</td>
    <td>{{ filing_date }}</td>
    <td>{{ trade.comp_name }}</td>
    <td>{{ trade.comp_industry }}</td>
    <td>{{ trade.buyer_name }}</td>
    <td>
      <span v-for="(title, index) in trade.buyer_titles" :key="index">
        <span v-if="index">, </span> {{ title }}
      </span>
    </td>
  </tr>

  <tr v-if="show_details" style="border: 1px solid black">
    <td colspan="7" class="details text-start">
      <div class="row">
        <div class="col">
          <h3>Details about the trade</h3>
          <b>Trade ID: </b> {{ trade.trade_id }} <br />
          <b>Trade date: </b> {{ trade_date }} <br />
          <b>Filing date: </b> {{ filing_date }} <br />
          <b>Buyer's titles: </b> {{ trade.buyer_titles }} <br />
          <b>Buyer's name: </b> {{ trade.buyer_name }} <br />
          <b>Company sector: </b> {{ trade.comp_sector }} <br />
          <b>Company subsector: </b> {{ trade.comp_subsector }} <br />
          <b>Company industry: </b> {{ trade.comp_industry }} <br />
          <b>Company name: </b> {{ trade.comp_name }} <br />
          <b>Stock ticker: </b> {{ trade.stock_ticker }} <br />
          <b>Stock ID: </b> {{ trade.stock_id }} <br />
          <b>Stock price on purchase: </b> {{ trade.stock_price }}$ <br />
          <b>Stock purchase quantity: </b> {{ trade.stock_quantity }} <br />
          <b>Stock new ownership: </b> {{ trade.stock_new_ownership }} <br />
        </div>
        <div
          class="col"
          style="max-height: 500px; overflow-y: scroll; white-space: pre"
        >
          {{ old_prices }}
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
const dateFormat = require("dateformat");

export default {
  props: ["trade", "index"],
  data() {
    return {
      show_details: false,
      prices_data: [],
      old_prices: "",
    };
  },
  computed: {
    trade_date() {
      return dateFormat(this.trade.trade_date, "mmm dd, yyyy");
    },
    filing_date() {
      return dateFormat(this.trade.filing_date, "mmm dd, yyyy");
    },
  },
  methods: {
    async change_state() {
      if (!this.show_details) {
        try {
          const payload = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ stock_id: this.trade.stock_ticker }),
          };
          const res = await fetch("http://localhost:3000/getpp", payload);
          const res_json = await res.json();
          Object.keys(res_json.rows[0].price_history).forEach((price_date) => {
            this.old_prices += dateFormat(
              new Date(price_date * 1000),
              "mmm dd, yyyy => "
            );
            this.old_prices +=
              Math.floor(res_json.rows[0].price_history[price_date] * 100) /
              100;
            this.old_prices += "$ \n";
          });

          console.log(res_json.rows[0].price_history);
        } catch (e) {
          console.log(e);
        }
        this.show_details = !this.show_details;
      } else {
        this.show_details = !this.show_details;
      }
    },
  },
};
</script>

<style scoped>
.details {
  padding: 1em;
  margin: 0;
}
</style>