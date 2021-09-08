<template>
  <form @submit.prevent="makeQuery()">
    <input type="text" v-model="ticker" />
    <button class="btn" type="submit">Search</button>
  </form>
  {{ sliderMinDate }}
  {{ sliderMaxDate }}
  <div class="range-slider">
    <input
      type="range"
      :min="sliderMin"
      :max="sliderMax"
      step="1"
      v-model="sliderLow"
      @change="setDateValues()"
    />
    <input
      type="range"
      :min="sliderMin"
      :max="sliderMax"
      step="1"
      v-model="sliderHigh"
      @change="setDateValues()"
    />
  </div>
  {{ sliderLowDate }}
  {{ sliderHighDate }}
  <br />
  <br />
  <div
    style="max-height: 500px; overflow-y: scroll; white-space: pre"
    class="pt-3"
  >
    {{ old_prices }}
  </div>
</template>

<script>
const dateFormat = require("dateformat");

export default {
  data() {
    return {
      ticker: "AMZN",
      old_prices: "",
      sliderMin: 0,
      sliderMax: 100,
      sliderLow: 12,
      sliderHigh: 24,
      sliderMinDate: "",
      sliderMaxDate: "",
      sliderLowDate: "",
      sliderHighDate: "",
    };
  },
  watch: {
    sliderLow() {
      this.setDateValues();
    },
    sliderHigh() {
      this.setDateValues();
    },
  },
  methods: {
    slider: function () {
      if (this.minPrice > this.maxPrice) {
        var tmp = this.maxPrice;
        this.maxPrice = this.minPrice;
        this.minPrice = tmp;
      }
    },
    setDateValues() {
      this.sliderMinDate = dateFormat(
        new Date(this.sliderMin * 1000),
        "yyyy/mm/dd"
      );
      this.sliderMaxDate = dateFormat(
        new Date(this.sliderMax * 1000),
        "yyyy/mm/dd"
      );
      this.sliderLowDate = dateFormat(
        new Date(this.sliderLow * 1000),
        "yyyy/mm/dd"
      );
      this.sliderHighDate = dateFormat(
        new Date(this.sliderHigh * 1000),
        "yyyy/mm/dd"
      );
    },
    async makeQuery() {
      const payload = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stock_id: this.ticker }),
      };
      const res = await fetch("http://localhost:3000/getpp", payload);
      const res_json = await res.json();

      this.sliderMin = Object.keys(res_json.rows[0].price_history)[0];
      this.sliderMax = Object.keys(res_json.rows[0].price_history)[
        Object.keys(res_json.rows[0].price_history).length - 1
      ];
      this.setDateValues();

      Object.keys(res_json.rows[0].price_history).forEach((price_date) => {
        this.old_prices += dateFormat(
          new Date(price_date * 1000),
          "mmm dd, yyyy => "
        );
        this.old_prices +=
          Math.floor(res_json.rows[0].price_history[price_date] * 100) / 100;
        this.old_prices += "$ \n";
      });
      this.sliderLow = Object.keys(res_json.rows[0].price_history)[0];
      this.sliderHigh = Object.keys(res_json.rows[0].price_history)[
        Object.keys(res_json.rows[0].price_history).length - 1
      ];
    },
  },
};
</script>

<style scoped>
.range-slider {
  width: 300px;
  margin: auto;
  text-align: center;
  position: relative;
  padding-bottom: 1em;
}

.range-slider input[type="range"] {
  position: absolute;
  left: 0;
  bottom: 0;
}

input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
}

input[type="range"]:focus {
  outline: none;
}

input[type="range"]:focus::-webkit-slider-runnable-track {
  background: green;
}

input[type="range"]:focus::-ms-fill-lower {
  background: green;
}

input[type="range"]:focus::-ms-fill-upper {
  background: green;
}

input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 5px;
  cursor: pointer;
  animate: 0.2s;
  background: green;
  border-radius: 1px;
  box-shadow: none;
  border: 0;
}

input[type="range"]::-webkit-slider-thumb {
  z-index: 2;
  position: relative;
  box-shadow: 0px 0px 0px #000;
  border: 1px solid green;
  height: 18px;
  width: 18px;
  border-radius: 25px;
  background: greenyellow;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -7px;
}
</style>