<template>
  <div>
    <query-maker></query-maker>
    <div v-if="shown_data.length" class="my_table">
      <trades-table :shown_data="shown_data"></trades-table>
    </div>
  </div>
</template>

<script>
import QueryMaker from '../components/searchdb/QueryMaker.vue'
import TradesTable from '../components/searchdb/PastTradesTable.vue'

export default {
  components: {
    TradesTable,
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
    async makeQuery(query_params) {
      this.shown_data = [];
      const payload = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query_params: query_params, }),
      };
      const res = await fetch("http://localhost:3000/searchdb", payload);
      const res_json = await res.json();
      this.shown_data = res_json.rows;
    },
  },
};
</script>

