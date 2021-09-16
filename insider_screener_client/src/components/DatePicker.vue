<template>
  <div class="higest">
    {{ minDate }} <br />
    {{ maxDate }} <br />
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
      <select class="select day">
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
      <select class="select day">
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
    <div class="ok">
      okm
    </div>
  </div>
</template>

<script>
import Timestamp from "unix-timestamp";
import Dateformat from "dateformat";

export default {
  props: ["minDate", "maxDate"],
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
