<template>
  <div>
    <navigation />

    <b-container class="mt-4 mb-5">
      <div class="row">
        <div class="col-lg-9 col-md-9 col-sm-12"></div>
        <div class="col-lg-3 col-md-9 col-sm-12">
          Select Year
          <b-form-select class="mb-4" v-model="selected">
            <b-form-select-option :value="null">
              Select Year
            </b-form-select-option>
            <b-form-select-option
              v-for="year in getYears"
              :value="year"
              :key="year"
              :selected="selected"
            >
              {{ year }}
            </b-form-select-option>
          </b-form-select>
        </div>
      </div>

      <h5 class="mb-4">
        <b-spinner
          variant="darker"
          label="Spinning"
          class="mr-2"
          v-if="loading"
        ></b-spinner>
        Totals
      </h5>

      <CardCases
        :totalCase="getDengueCases.TOTAL_CASES"
        :totalRecoveries="getDengueCases.TOTAL_RECOVERIES"
        :totalDeaths="getDengueCases.TOTAL_DEATHS"
      />
    </b-container>

    <b-container class="mt-4">
      <h5 class="mb-4">
        <b-spinner
          variant="darker"
          label="Spinning"
          class="mr-2"
          v-if="loading"
        ></b-spinner>
        Graphs
      </h5>

      <div class="row">
        <div class="col-lg-6 col-sm-12 col-md-6 col-xs-12">
          <Bar :chartData="getchartPerMonth" />
        </div>
        <div class="col-lg-6 col-sm-12 col-md-6 col-xs-12">
          <Bar :chartData="chartBrgyData" />
        </div>
      </div>
    </b-container>

    <b-container class="mt-4 mb-5">
      <h5 class="mb-4">
        <b-spinner
          variant="darker"
          label="Spinning"
          class="mr-2"
          v-if="loading"
        ></b-spinner>
        Geo Tagging
      </h5>
      <google-map-loader :markerDatas="markers" />
    </b-container>

    <Footer />
  </div>
</template>

<script>
import Navigation from "../components/Navigation";
import CardCases from "../components/CardCases";
import Bar from "../components/Bar";
import Footer from "../components/Footer";
import GoogleMapLoader from "../components/GoogleMapLoader";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    Navigation,
    CardCases,
    Bar,
    Footer,
    GoogleMapLoader
  },
  data() {
    return {
      selected: null,
      loading: false
    };
  },
  computed: {
    ...mapGetters([
      "getYears",
      "getDengueCases",
      "getchartPerMonth",
      "chartBrgyData",
      "markers"
    ])
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
    this.loading = true;

    const years = await this.$store.dispatch("getYears");
    const request = {
      request: "dashboardDatas",
      year: !years[0] ? "2020" : years[0]
    };
    this.selected = years[0];
    this.$store.dispatch("getDengueCases", request);

    this.loading = false;
  }
};
</script>
