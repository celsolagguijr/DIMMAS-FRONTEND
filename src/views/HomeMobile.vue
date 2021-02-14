<template>
  <div>
    <van-nav-bar title="DIMMAS" />
    <van-dropdown-menu>
      <van-dropdown-item v-model="selected" :options="years" />
    </van-dropdown-menu>
    <van-grid :column-num="3">
      <van-grid-item>
        <h1 class="text-danger">{{ getDengueCases.TOTAL_CASES }}</h1>
        <p class="text-danger">Cases</p>
      </van-grid-item>
      <van-grid-item>
        <h1 class="text-success">{{ getDengueCases.TOTAL_RECOVERIES }}</h1>
        <p class="text-success">Recoveries</p>
      </van-grid-item>
      <van-grid-item>
        <h1 class="text-darker">{{ getDengueCases.TOTAL_DEATHS }}</h1>
        <p class="text-darker">Deaths</p>
      </van-grid-item>
    </van-grid>
    <van-divider content-position="left">Graphs</van-divider>
    <van-row class="mb-5">
      <van-col span="2"> </van-col>
      <van-col span="20">
        <Bar :chartData="chartBrgyData" />
      </van-col>
      <van-col span="2"> </van-col>
    </van-row>

    <van-row class="mb-5">
      <van-col span="2"> </van-col>
      <van-col span="20">
        <Bar :chartData="getchartPerMonth" />
      </van-col>
      <van-col span="2"> </van-col>
    </van-row>
    <van-divider content-position="left">Geo Tagging</van-divider>
    <van-row>
      <van-col span="2"> </van-col>
      <van-col span="20">
        <google-map-loader :markerDatas="markers" />
      </van-col>
      <van-col span="2"> </van-col>
    </van-row>

    <div class="mb-5"></div>

    <mobile-nav />
  </div>
</template>

<script>
import Bar from "../components/Bar.vue";
import GoogleMapLoader from "../components/GoogleMapLoader.vue";
import { mapGetters } from "vuex";
import MobileNav from "../components/MobileNav.vue";
export default {
  components: { Bar, GoogleMapLoader, MobileNav },
  data() {
    return {
      selected: null
    };
  },
  computed: {
    ...mapGetters([
      "getYears",
      "getDengueCases",
      "getchartPerMonth",
      "chartBrgyData",
      "markers"
    ]),
    years() {
      return [
        { text: "Select Year", value: null },
        ...this.getYears.map(data => {
          return {
            text: data,
            value: data
          };
        })
      ];
    }
  },
  watch: {
    selected() {
      if (this.selected !== null) {
        this.loading = true;
        const request = {
          request: "dashboardDatas",
          year: this.selected
        };
        this.$store.dispatch("getDengueCases", request);
        this.loading = false;
      }
    }
  },
  async mounted() {
    const years = await this.$store.dispatch("getYears");
    const request = {
      request: "dashboardDatas",
      year: years[0]
    };

    this.selected = years[0];
    this.$store.dispatch("getDengueCases", request);
  }
};
</script>
