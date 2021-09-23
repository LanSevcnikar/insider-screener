<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th class="click_header" scope="col">#</th>
        <th class="click_header" scope="col" @click="change_sort('trade_date')">
          Trade date
        </th>
        <th
          class="click_header"
          scope="col"
          @click="change_sort('filing_date')"
        >
          Filing date
        </th>
        <th class="click_header" scope="col" @click="change_sort('comp_name')">
          Company name
        </th>
        <th
          class="click_header"
          scope="col"
          @click="change_sort('comp_industry')"
        >
          Company industry
        </th>
        <th class="click_header" scope="col" @click="change_sort('buyer_name')">
          Buyer's name
        </th>
        <th
          class="click_header"
          scope="col"
          @click="change_sort('buyer_titles')"
        >
          Buyer's titles
        </th>
        <th
          class="click_header"
          scope="col"
          @click="change_sort('stock_total')"
        >
          Bought
        </th>
      </tr>
    </thead>
    <tbody>
      <past-trade-row
        v-for="(trade, index) in data"
        :key="index"
        :index="index"
        :trade="trade"
        :columns="columns"
      >
      </past-trade-row>
    </tbody>
  </table>
</template>

<script>
import PastTradeRow from "./PastTradeRow.vue";
export default {
  components: {
    PastTradeRow,
  },
  data() {
    return {
      data: [],
      sort_by: null,
    };
  },
  created() {
    this.data = this.shown_data;
  },
  methods: {
    change_sort(new_sort) {
      console.log(new_sort);
      if (this.sort_by == new_sort) {
        this.data = this.data.sort((a, b) => {
          if (new_sort == "stock_total") {
            if (+a[new_sort] > +b[new_sort]) return -1;
            if (+a[new_sort] < +b[new_sort]) return 1;
            return 0;
          } else {
            if (a[new_sort] > b[new_sort]) return -1;
            if (a[new_sort] < b[new_sort]) return 1;
            return 0;
          }
        });
        this.sort_by = null;
      } else {
        this.data = this.data.sort((a, b) => {
          if (new_sort == "stock_total") {
            if (+a[new_sort] > +b[new_sort]) return 1;
            if (+a[new_sort] < +b[new_sort]) return -1;
            return 0;
          } else {
            if (a[new_sort] > b[new_sort]) return 1;
            if (a[new_sort] < b[new_sort]) return -1;
            return 0;
          }
        });
        this.sort_by = new_sort;
      }
    },
  },
  props: ["shown_data"],
};
</script>

<style lang="scss" scoped>
table {
  border: 1px solid black;
  width: 95%;
  margin: auto;
  min-width: 900px;
  thead {
    tr {
      .click_header {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
}
</style>>
