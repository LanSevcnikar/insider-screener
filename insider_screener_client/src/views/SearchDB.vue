<template>
  <div>
    <query-maker></query-maker>
    <div v-if="shown_data.length" class="my_table">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Trade date</th>
            <th scope="col">Filing date</th>
            <th scope="col">Company name</th>
            <th scope="col">Company industry</th>
            <th scope="col">Buyer's name</th>
            <th scope="col">Buyer's titles</th>
          </tr>
        </thead>
        <tbody>
          <suspense>
            <template #default>
              <past-trade-row
                v-for="(trade, index) in shown_data"
                :key="index"
                :index="index"
                :trade="trade"
                :columns="columns"
              >
              </past-trade-row>
            </template>
            <template #fallback> ...Loading </template>
          </suspense>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";
import QueryMaker from '../components/searchdb/QueryMaker.vue'

export default {
  components: {
    PastTradeRow: defineAsyncComponent(() =>
      import("../components/searchdb/PastTradeRow.vue")
    ),
    QueryMaker,
  },
  data() {
    return {
      query: "true",
      amount: 1000,
      shown_data: [],
      columns: [
        "trade_id",
        "trade_date",
        "filing_date",
        "buyer_titles",
        "buyer_name",
        "comp_sector",
        "comp_subsector",
        "comp_industry",
        "comp_name",
        "stock_ticker",
        "stock_id",
        "stock_price",
        "stock_quantity",
        "stock_new_ownership",
      ],
    };
  },
  methods: {
    async makeQuery() {
      console.log("Making a query");
      const query = `SELECT * FROM is_past_trades WHERE ${this.query} LIMIT ${this.amount};`;
      const payload = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query }),
      };
      const res = await fetch("http://localhost:3000/searchdb", payload);
      const res_json = await res.json();
      this.shown_data = res_json.rows;
    },
  },
  created() {
    this.makeQuery();
  },
};
</script>

<style lang="css" scoped>
table {
  border: 1px solid black;
  width: 95%;
  margin: auto;
}
</style>>
