<template>
  <!-- THIS IS THE BUTTONS ON THE TOP -->
  <div class="parametersbutton">
    <button class="btn" @click="show_query_params = !show_query_params">
      Query parameters
      <span v-if="show_query_params"> - </span>
      <span v-else> + </span>
    </button>
  </div>
  <div
    class="querySelector params"
    :class="show_query_params ? '' : 'params_hidden'"
  >
    <div
      v-for="par in [
        'comp_subsector',
        'comp_industry',
        'comp_name',
        'buyer_name',
        'buyer_titles',
        'trade_date',
      ]"
      :key="par"
    >
      <button
        class="btn"
        @click="getQueryParams(par)"
        :style="
          query_params[par] && query_params[par].length
            ? 'background-color: #ccc;'
            : ''
        "
      >
        {{ paramTranslator(par) }}
      </button>
    </div>

    <div>
      <button
        class="btn"
        @click="getQueryParams('stock_total')"
        :style="
          query_params['stock_total'] && query_params['stock_total'].length
            ? 'background-color: #ccc;'
            : ''
        "
      >
        {{ paramTranslator("stock_total") }}
      </button>
    </div>
    <div>
      <button class="btn main_query" @click="clearSelected()">
        Clear selected
      </button>
    </div>
  </div>
  <div class="querySelector">
    <div>
      <button
        class="btn main_query"
        @click="order_by = true"
        :style="
          query_params.query_order && query_params.query_order.length
            ? 'background-color: #ccc;'
            : ''
        "
      >
        Order by
      </button>
    </div>
    <div>
      Quantity:
      <select class="btn qunat_selector" v-model="query_params.query_qunat">
        <option value="25">25</option>
        <option value="100">100</option>
        <option value="500">500</option>
        <option value="1000">1000</option>
      </select>
    </div>
    <div>
      <button class="btn main_query" @click="this.$parent.makeQuery(query_params)">Query!</button>
    </div>
  </div>

  <div
    class="popupparent"
    @click.self="closePopup()"
    v-if="column_param || order_by"
  >
    <div class="popup">
      <div class="popuptitle" v-if="order_by">Order by</div>
      <div class="popuptitle" v-else>
        {{ paramTranslator(column_param) }}
      </div>
      <!-- WHEN THERE ARE OPTIONS TO CLICK -->
      <div
        v-if="
          [
            'comp_subsector',
            'comp_industry',
            'comp_name',
            'buyer_name',
            'buyer_titles',
          ].indexOf(column_param) >= 0
        "
      >
        <input
          type="text"
          class="searchBar"
          v-model="query_search_string"
          placeholder="Search"
        />
        <div class="optionslist" :key="query_search_string">
          <div v-if="options.length">
            <label
              v-for="option in options.filter(
                (str) =>
                  str.toLowerCase().indexOf(query_search_string.toLowerCase()) >
                  -1
              )"
              :key="option"
              class="optionrow"
            >
              <input
                type="checkbox"
                class="form-check-label"
                id="flexCheckDefault"
                :value="option"
                :checked="
                  query_params[column_param] &&
                  query_params[column_param].length &&
                  query_params[column_param].indexOf(option) >= 0
                "
                @change="editSelect(column_param, option)"
              />{{ option }}
            </label>
          </div>
          <div v-else>...Loading</div>
        </div>
      </div>
      <!-- Date selector -->
      <div v-else-if="'trade_date' == column_param">
        <date-picker
          v-if="options.min"
          :minDate="options.min"
          :maxDate="options.max"
          :lastdate="query_params.trade_date"
          v-model="query_params.trade_date"
          ref="datepicker"
        ></date-picker>
      </div>
      <!--  Max and min bought value  -->
      <div v-else-if="'stock_total' == column_param" class="optionslider">
        <Slider
          v-if="typeof options.min == 'number'"
          v-model="query_params.stock_total"
          :min="options.min"
          :max="options.max"
          :step="parseInt((options.max - options.min) / 200)"
          :format="getMoneyFormat"
        />
      </div>
      <!-- ORDER BY TYPE THING -->
      <div v-else class="orderby">
        <vue-draggable-next
          class="dragArea"
          :list="query_params.query_order"
          @change="log"
        >
          <div
            class="orderby_row"
            v-for="(element, index) in query_params.query_order"
            :key="element.name"
          >
            <div>
              <button class="btn" @click="query_params.query_order.splice(index,1)"> X </button>
            </div>
            <div>
              {{ paramTranslator(element.name) }}
            </div>
            <div class="orderbyclick">
              <button @click="element.asc = !element.asc">
                <span v-if="element.asc">Asc</span>
                <span v-else> Desc</span>
              </button>
            </div>
          </div>
        </vue-draggable-next>
        <div class="addorder">
          <select class="btn qunat_selector" v-model="order_temp.name">
            <option disabled value="null">Order by</option>
            <option
              v-for="item in [
                'trade_date',
                'filing_date',
                'buyer_name',
                'comp_sector',
                'comp_subsector',
                'comp_industry',
                'comp_name',
                'stock_ticker',
                'stock_price',
                'stock_quantity',
                'stock_new_ownership',
              ]"
              :key="item"
              :value="item"
            >
              {{ paramTranslator(item) }}
            </option>
          </select>
          <select v-model="order_temp.asc" class="btn qunat_selector">
            <option disabled value="null">Asc/Desc</option>
            <option value="true">ASC</option>
            <option value="false">DESC</option>
          </select>
          <button class="btn" @click="addOrderItem()">Add order</button>
        </div>
      </div>
      <div class="footer">
        <div class="footertext">
          If none are selected it's the same as if all were <br />
          Changes are saved automatically
        </div>
        <div class="footerbuttons">
          <button
            class="btn"
            @click="
              query_params[column_param] = null;
              if (order_by) order_temp = { name: null, asc: null, id: null };
              query_params.query_order = [];
              if ('trade_date' == column_param)
                this.$refs.datepicker.clearData();
              if ('stock_total' == column_param)
                query_params[column_param] = [options.min, options.max];
            "
          >
            Clear selected
          </button>
          <button class="btn" @click="closePopup()">Close</button>
        </div>
      </div>
    </div>

    <!-- THIS IS THE POPUP FOR THE DATES -->
  </div>
</template>

<script>
import DatePicker from "./DatePicker.vue";
import { VueDraggableNext } from "vue-draggable-next";
import Slider from "@vueform/slider";
const numeral = require("numeral");

export default {
  components: {
    DatePicker,
    Slider,
    VueDraggableNext,
  },
  data() {
    return {
      order_temp: { name: null, asc: null, id: null },

      testtext: "",
      query_search_string: "",
      column_param: null,
      show_query_params: false,
      order_by: false,
      query_params: {
        trade_date: null,
        filing_date: null,
        buyer_titles: null,
        buyer_name: null,
        comp_sector: null,
        comp_subsector: null,
        comp_industry: null,
        comp_name: null,
        stock_price: null,
        stock_quantity: null,
        stock_total: null,
        query_qunat: 25,
        query_order: [],

        query: null,
      },
      options: [],
      getMoneyFormat: function (value) {
        return numeral(value).format("$ 0.00a");
      },
    };
  },
  methods: {
    addOrderItem() {
      console.log(this.order_temp);
      if (this.order_temp.name && this.order_temp.asc) {
        this.order_temp.id = this.query_params.query_order.length;
        this.query_params.query_order.push(this.order_temp);
        this.order_temp = { name: null, asc: null, id: null };
      }
    },
    clearSelected() {
      this.query_params = {
        trade_date: null,
        filing_date: null,
        buyer_titles: null,
        buyer_name: null,
        comp_sector: null,
        comp_subsector: null,
        comp_industry: null,
        comp_name: null,
        stock_price: null,
        stock_quantity: null,
        stock_total: null,
        query_qunat: 25,
        query_params: null,
        query_order: [],

        query: null,
      };
      this.order_temp = { name: null, asc: null, id: null };
      this.options = [];
      this.testtext = "";
      this.query_search_string = "";
      this.column_param = null;
    },
    paramTranslator(par) {
      const param_translator = {
        trade_date: "Trade date",
        filing_date: "Filing name",
        buyer_titles: "Buyer titles",
        buyer_name: "Name of buyer",
        comp_sector: "Company sector",
        comp_subsector: "Company subsector",
        comp_industry: "Company industry",
        comp_name: "Company name",
        stock_ticker: "Stock ticker",
        stock_price: "Stock price",
        stock_quantity: "Stock quantity",
        stock_total: "Total value purchased",
        stock_new_ownership: "New ownership of the stock",
      };
      if (param_translator[par]) {
        return param_translator[par];
      }
      return ".";
    },
    editSelect(col, par) {
      if (
        this.query_params[col] &&
        this.query_params[col].length &&
        this.query_params[col].indexOf(par) >= 0
      ) {
        this.query_params[col] = this.query_params[col].filter(
          (item) => item != par
        );
        if (!this.query_params[col].length) {
          this.query_params[col] = null;
        }
      } else {
        if (!this.query_params[col]) {
          this.query_params[col] = [];
        }
        this.query_params[col].push(par);
      }
    },
    closePopup() {
      this.order_by = false;
      this.column_param = null;
      this.query_search_string = "";
      if (this.query_params.stock_total) {
        if (this.query_params.stock_total[0] == parseInt(this.options.min)) {
          if (this.query_params.stock_total[1] == parseInt(this.options.max)) {
            this.query_params.stock_total = null;
          }
        }
      }
      this.options = [];
    },
    async getQueryParams(column_param) {
      this.column_param = column_param;
      //this.query_params[this.column_param] = null;
      const payload = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query_params: this.query_params,
          column_param: this.column_param,
        }),
      };
      const res = await fetch("http://localhost:3000/getqueryparams", payload);
      const res_json = await res.json();
      if (
        this.query_params[this.column_param] &&
        this.query_params[this.column_param].length &&
        this.column_param != "trade_date" &&
        this.column_param != "stock_total"
      ) {
        this.query_params[this.column_param].forEach((selected) => {
          if (res_json.indexOf(selected) == -1) {
            this.query_params[this.column_param] = null;
            this.getQueryParams(column_param);
          }
        });
      }
      this.options = res_json;
      if (
        this.column_param != "trade_date" &&
        this.column_param != "stock_total"
      ) {
        this.options = this.options.sort((a, b) => {
          const selected_any = this.query_params[column_param] ? true : false;
          if (selected_any) {
            const a_in = this.query_params[column_param].indexOf(a) >= 0;
            const b_in = this.query_params[column_param].indexOf(b) >= 0;
            if (a_in && b_in) {
              return a > b ? 1 : -1;
            } else if (a_in) {
              return -1;
            } else if (b_in) {
              return 1;
            } else {
              return a > b ? 1 : -1;
            }
          } else {
            return a > b ? 1 : -1;
          }
        });
      }
      if (this.column_param == "stock_total") {
        if (
          this.query_params.stock_total == null ||
          parseInt(res_json.min) > this.query_params.stock_total[0] ||
          parseInt(res_json.max) < this.query_params.stock_total[1]
        ) {
          this.query_params.stock_total = [
            parseInt(res_json.min),
            parseInt(res_json.max),
          ];
        }
        this.options.min = parseInt(res_json.min);
        this.options.max = parseInt(res_json.max);
      }
    },
  },
};

/*
"trade_id", o
"trade_date", 
"filing_date",
"buyer_titles",
"buyer_name", x
"comp_sector", x
"comp_subsector", x
"comp_industry", x
"comp_name", x
"stock_ticker", o
"stock_id", o
"stock_price",
"stock_quantity",
"stock_new_ownership", o
*/
</script>

<style src="@vueform/slider/themes/default.css"></style>
<style lang="scss" scoped>
.querySelector {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  div {
    flex: 2 0 21%;
    .qunat_selector {
      &:hover {
        background-color: white;
      }
    }
  }
  // .main_query {
  //   flex: 1 0 100% !important;
  //   width: 85%;
  //   font-size: 1.3em;
  //   background-color: var(--slider-bg);
  //   button {
  //     background-color: red;
  //   }
  // }
}

.params {
  border: solid 1px #888;
  border-radius: 6px;
  width: 80%;
  margin: auto;
  height: 160px;
  padding: 35px 10px 30px 10px;
  margin-bottom: 3px;
  overflow-y: hidden;
  transition-duration: 1s;
}

.params_hidden {
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  height: 0px;
  border-bottom: solid 1px #fff;
  border-left: solid 1px #fff;
  border-right: solid 1px #fff;
  margin-bottom: 20px;
}

.parametersbutton {
  position: absolute;
  background-color: white;
  text-align: left;
  margin-left: 14%;
  border-radius: 10px;
  margin-top: -17px;
}

.popupparent {
  z-index: 4;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(2px);

  .popup {
    border-radius: 10px;
    padding-top: 20px;
    border: 1px solid black;
    position: fixed;
    top: calc(50vh - 300px);
    left: calc(50vw - 400px);
    background-color: white;
    z-index: 5;
    width: 800px;
    height: 600px;

    .popuptitle {
      top: 0px;
      margin-top: -10px;
      margin-bottom: 10px;
      font-size: 1.3em;
    }

    .searchBar {
      background-color: white;
      width: 90%;
      border-radius: 4px;
      padding-bottom: 2px;
      padding-left: 20px;
      margin-bottom: 16px;
      border: 1px solid #aaa;
      font-size: 1.3em;
    }

    .footer {
      position: absolute;
      bottom: 5px;
      padding-top: 10px;
      padding-left: 15px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      .footertext {
        text-align: left;
        margin: 0px;
      }
      .footerbuttons {
        margin-right: 20px;
        button {
          border: 1px solid #aaa;
          margin-left: 10px;
          &:hover {
            background-color: rgba(0, 0, 0, 0.07);
          }
        }
      }
    }

    .orderby {
      .dragArea{
        margin-top: 20px;
      }
      .addorder {
        position: absolute;
        width: 60%;
        margin-left: 20%;
        bottom: 70px;
        border-radius: 4px;
      }
      .orderby_row {
        cursor: pointer;
        font-size: 1.3em;
        width: 70%;
        margin: auto;
        display: flex;
        justify-content: space-between;
        text-align: left;
        .orderbyname {
          background-color: white;
        }
        .orderbyclick {
          button {
            margin: 1px;
            background-color: white;
            text-align: center;
            border: none;
            border-radius: 30px;
            width: 55px;
          }
        }
      }
    }

    .optionslider {
      width: 70%;
      margin: auto;
      margin-top: 100px;
    }

    .optionslist {
      padding-left: 4px;
      background-color: white;
      overflow-y: scroll;
      height: 440px;
      font-size: 1.3em;
      width: 100%;

      .optionrow {
        margin-left: 6px;
        width: 95%;
        &:hover {
          background-color: #eeeeee;
        }
        text-align: start;
        border-radius: 5px;
        padding: 3px 0px 3px 0px;

        input {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
