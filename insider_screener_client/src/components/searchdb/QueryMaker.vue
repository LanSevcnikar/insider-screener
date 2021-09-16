<template>
  <!-- THIS IS THE BUTTONS ON THE TOP -->
  <div class="pb-3 querySelector">
    <div
      v-for="par in [
        'comp_subsector',
        'comp_industry',
        'comp_name',
        'buyer_name',
        'buyer_titles',
        'trade_date',
        'filing_date',
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
  </div>

  <div class="popupparent" @click.self="closePopup()" v-if="column_param">
    <!-- THIS IS TJE POPUP FOR THE CLICKABLE OPTIONS -->
    <div class="popup">
      <div class="popuptitle">
        {{ paramTranslator(column_param) }}
      </div>
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
        <!-- WHEN THERE ARE OPTIONS TO CLICK -->
        <div class="optionslist" :key="query_search_string">
          <div v-if="options.length">
            <label
              v-for="option in options
                .filter(
                  (str) =>
                    str
                      .toLowerCase()
                      .indexOf(query_search_string.toLowerCase()) > -1
                )
                .sort((a, b) => {
                  if (
                    query_params[column_param] &&
                    query_params[column_param].indexOf(a) >= 0
                  ) {
                    return -1;
                  }
                  return 1;
                })"
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
      <div v-else-if="['trade_date', 'filing_date'].indexOf(column_param) >= 0">
        HELLO
        <date-picker
          v-if="options.min"
          :minDate="options.min"
          :maxDate="options.max"
        ></date-picker>
      </div>
      <div class="footer">
        <div class="footertext">
          If none are selected it's the same as if all were <br />
          Changes are saved automatically
        </div>
        <div class="footerbuttons">
          <button class="btn" @click="query_params[column_param] = null">
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
import DatePicker from "../DatePicker.vue";

export default {
  components: {
    DatePicker,
  },
  data() {
    return {
      query_search_string: "",
      column_param: null,
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

        query: null,
      },
      options: [],
    };
  },
  methods: {
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
        stock_price: "Stock price",
        stock_quantity: "Stock quantity",
        stock_total: "Total value purchased",
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
      this.column_param = null;
      this.query_search_string = "";
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
      if (this.query_params[this.column_param]) {
        this.query_params[this.column_param].forEach((selected) => {
          if (res_json.indexOf(selected) == -1) {
            this.query_params[this.column_param] = null;
            this.getQueryParams(column_param);
          }
        });
      }
      this.options = res_json;
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

<style lang="scss" scoped>
.querySelector {
  display: flex;
  flex-wrap: wrap;
  div {
    flex: 2 0 19%;
  }
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