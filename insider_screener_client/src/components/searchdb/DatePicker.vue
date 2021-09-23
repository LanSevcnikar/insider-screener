<template>
  <div class="higest">
    <!-- YEAR -->
    <div class="dateselector">
      <span class="selectordate">Starting date:</span>
      <select class="select year" v-model="s_year">
        <option value="null" disabled></option>
        <option
          v-for="(year, index) in Object.keys(dateOptions)"
          :key="index"
          :value="year"
        >
          {{ year }}
        </option>
      </select>
      <!-- MONTH -->
      <select class="select month" v-model="s_month">
        <option value="null" disabled></option>
        <option
          v-for="(month, index) in Object.keys(dateOptions[s_year]).sort(
            (a, b) => {
              if (+a > +b) return 1;
              return -1;
            }
          )"
          :key="index"
          :value="month"
          v-if="s_year"
        >
          {{ +month }}
        </option>
      </select>
      <select class="select day" v-model="s_day">
        <option value="null" disabled></option>
        <option
          v-for="(day, index) in dateOptions[s_year][s_month]"
          :key="index"
          :value="day"
          v-if="s_month"
        >
          {{ +day }}
        </option>
      </select>
    </div>
    <div class="dateselector">
      <span class="selectordate">Ending date:</span>
      <select class="select year" v-model="e_year">
        <option value="null" disabled></option>
        <option
          v-for="(year, index) in Object.keys(dateOptions)"
          :key="index"
          :value="year"
        >
          {{ year }}
        </option>
      </select>
      <!-- MONTH -->
      <select class="select month" v-model="e_month">
        <option value="null" disabled></option>
        <option
          v-for="(month, index) in Object.keys(dateOptions[e_year]).sort(
            (a, b) => {
              if (+a > +b) return 1;
              return -1;
            }
          )"
          :key="index"
          :value="month"
          v-if="e_year"
        >
          {{ +month }}
        </option>
      </select>
      <select class="select day" v-model="e_day">
        <option value="null" disabled></option>
        <option
          v-for="(day, index) in dateOptions[e_year][e_month]"
          :key="index"
          :value="day"
          v-if="e_month"
        >
          {{ +day }}
        </option>
      </select>
    </div>
    <div class="ok" v-if="validDate()" style="color: green">
      Valid date, changes saved
    </div>
    <div v-else class="ok" style="color: red">
      Invalid date, no date selected yet
    </div>
  </div>
</template>

<script>
import Timestamp from "unix-timestamp";
import Dateformat from "dateformat";
import { ref } from "vue";

export default {
  setup() {
    const input = ref("");
    return { input };
  },
  created() {
    if (this.lastdate != null) {
      this.s_year = this.lastdate.substring(0, 4);
      this.s_month = this.lastdate.substring(5, 7);
      this.s_day = this.lastdate.substring(8, 10);
      this.e_year = this.lastdate.substring(11, 15);
      this.e_month = this.lastdate.substring(16, 18);
      this.e_day = this.lastdate.substring(19, 21);

      console.log(
        this.s_year,
        this.s_month,
        this.s_day,
        this.e_year,
        this.e_month,
        this.e_day
      );
    }
  },
  props: ["minDate", "maxDate", "lastdate"],
  data() {
    return {
      s_months: [],
      s_days: [],

      e_months: [],
      e_days: [],

      s_year: null,
      s_month: null,
      s_day: null,

      e_year: null,
      e_month: null,
      e_day: null,

      months: [
        "Jan.",
        "Feb.",
        "Mar.",
        "Apr.",
        "May",
        "Jun.",
        "Jul.",
        "Aug.",
        "Sep.",
        "Oct.",
        "Nov.",
        "Dec.",
      ],
    };
  },
  methods: {
    clearData() {
      this.s_year = null;
      this.s_month = null;
      this.s_day = null;
      this.e_year = null;
      this.e_month = null;
      this.e_day = null;
    },

    validDate() {
      if (
        !(
          this.s_year &&
          this.s_month &&
          this.s_day &&
          this.e_year &&
          this.e_month &&
          this.e_day
        )
      ) {
        return false;
      }

      const s_date = this.s_year * 10000 + this.s_month * 100 + this.s_day;
      const e_date = this.e_year * 10000 + this.e_month * 100 + this.e_day;

      if (s_date > e_date) return false;

      const datestring = `${this.s_year}-${this.s_month}-${this.s_day}/${this.e_year}-${this.e_month}-${this.e_day}`;
      this.$emit("update:modelValue", datestring);

      return true;
    },
  },
  computed: {
    years() {
      return [
        ...Array.from(
          {
            length:
              this.maxDate.substring(0, 4) - this.minDate.substring(0, 4) + 1,
          },
          (_, i) => (i + Number(this.minDate.substring(0, 4))).toString()
        ),
      ];
    },

    dateOptions() {
      let options = {};

      let st = Timestamp.fromDate(this.minDate.substring(0, 10));
      const en = Timestamp.fromDate(this.maxDate.substring(0, 10));

      let all_dates = [];
      while (st != en && st < Timestamp.fromDate("2021-09-01")) {
        const date = Dateformat(st * 1000, "yyyy-mm-dd");
        all_dates.push(date);
        st = Timestamp.add(st, "+1d");
      }
      const date = Dateformat(st * 1000, "yyyy-mm-dd");
      all_dates.push(date);

      all_dates.forEach((date) => {
        const year = date.substring(0, 4);
        const month = date.substring(5, 7);
        const day = date.substring(8, 10);
        if (year in options) {
          if (month in options[year]) {
            options[year][month].push(day);
          } else {
            options[year][month] = [];
            options[year][month].push(day);
          }
        } else {
          options[year] = {};
          options[year][month] = [];
          options[year][month].push(day);
        }
      });

      return options;
    },
  },
};
</script>

<style lang="scss" scoped>
.higest {
  margin-top: 180px;

  .ok {
    margin-top: 30px;
  }
  .dateselector {
    align-content: flex-start;

    .selectordate {
      display: inline-block;
      padding: 0;
      margin: 0;
      font-size: 1.2em;
      width: 140px;
    }

    .select {
      margin: 0.2em 0.1em;
      border: 1px solid lightgray;
      border-radius: 0.05em;
      cursor: pointer;
      font-size: 1rem;
      padding: 0.25em 0.5em;
    }
    .year {
      width: 80px;
    }
    .month {
      width: 57px;
    }
    .day {
      width: 57px;
    }
  }
}
</style>
