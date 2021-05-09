<template>
  <div>
    <Navigation />
    <b-container>
      <b-form @submit.prevent="generate" ref="formCase" id="form-case">
        <b-card style="margin-top:2em;">
          <b-card-body>
            <div class="row">
              <div class="col-lg-3 col-md-9 col-sm-12">
                <label for="">Select Filter Type</label>
                <b-form-select
                  class="mb-4"
                  name="filterType"
                  v-model="filterData.filterType"
                  @change="resetBarangay"
                  required
                >
                  <b-form-select-option :value="null">
                    ** Select **
                  </b-form-select-option>
                  <b-form-select-option
                    v-for="type in filterOptions.types"
                    :value="type"
                    :key="type"
                  >
                    {{ type }}
                  </b-form-select-option>
                </b-form-select>
              </div>
            </div>
            <hr />

            <div v-if="filterData.filterType === 'Choose Barangay'">
              <div class="row">
                <div class="col-lg-3 col-md-9 col-sm-12">
                  <label for="">Select Barangay</label>
                  <b-form-select
                    class="mb-4"
                    name="filterBarangay"
                    v-model="filterData.filterBarangay"
                    required
                  >
                    <b-form-select-option :value="null">
                      ** Select **
                    </b-form-select-option>
                    <b-form-select-option
                      v-for="barangay in showBrgys"
                      :key="barangay.id"
                      :value="barangay.id"
                    >
                      {{ barangay.name }}
                    </b-form-select-option>
                  </b-form-select>
                </div>
              </div>
              <hr />
            </div>

            <div class="row">
              <div class="col-lg-3 col-md-9 col-sm-12">
                <b-form-group>
                  <b-form-checkbox
                    :v-model="filterOptions.customDate"
                    :checked="filterOptions.customDate"
                    name="customDate"
                    @change="showCustomdate"
                  >
                    Custom Date
                  </b-form-checkbox>
                </b-form-group>

                <div v-if="filterOptions.customDate">
                  <b-form-group class="ml-4">
                    <label for="from-date">From:</label>
                    <b-form-input
                      type="date"
                      id="from-date"
                      class="mb-3"
                      name="fromDate"
                      v-model="filterData.filterCustomDate.from"
                      required
                    ></b-form-input>
                    <label for="from-to">To:</label>
                    <b-form-input
                      type="date"
                      id="from-to"
                      name="fromTo"
                      v-model="filterData.filterCustomDate.to"
                      required
                    ></b-form-input>
                  </b-form-group>
                </div>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-lg-3 col-md-9 col-sm-12">
                <b-form-group label="Filter By" v-slot="{ ariaDescribedby }">
                  <b-form-radio
                    v-for="dateFilter in filterOptions.dateFilters"
                    v-model="filterData.filterDate"
                    :aria-describedby="ariaDescribedby"
                    :key="dateFilter"
                    name="radio-inline"
                    :value="dateFilter"
                    required
                    >{{ dateFilter }}</b-form-radio
                  >
                </b-form-group>
              </div>
            </div>

            <div class="row mt-2 mb-2">
              <div class="col-lg-3 col-md-12 col-sm-12 m-1">
                <b-button variant="primary" type="submit" block
                  >Generate</b-button
                >
              </div>
              <div class="col-lg-3 col-md-12 col-sm-12 m-1">
                <JsonExcel
                  class="btn btn-primary w-100"
                  :data="rawData"
                  worksheet="My Worksheet"
                  name="data.xls"
                >
                  Download Data
                </JsonExcel>

              </div>
              <div class="col-lg-3 col-md-12 col-sm-12 m-1">
                <b-button
                  type="button"
                  @click="reset"
                  variant="outline-primary"
                  block
                  >Reset</b-button
                >
              </div>
            </div>
          </b-card-body>
        </b-card>
      </b-form>
    </b-container>

    <b-container style="margin-top:2em;margin-bottom:2em;">
      <b-card>

        <div class="w-100 d-flex">
        <h4>Result</h4>
          <b-spinner
          variant="primary"
          label="Spinning"
          class="ml-2"
          v-if="loading"
        ></b-spinner>
        </div>

        
        <b-card-body>
          <line-chart :chartData="reportData" />
        </b-card-body>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LineChart from "../components/LineChart.vue";
import Navigation from "../components/Navigation";
import JsonExcel from "vue-json-excel";

export default {
  components: { Navigation, LineChart, JsonExcel },
  data() {
    return {
      filterOptions: {
        types: ["All Barangay", "Choose Barangay"],
        dateFilters: ["Day", "Month", "Year"],
        customDate: false
      },
      filterData: {
        filterType: "",
        filterDate: "",
        filterBarangay: "",
        filterCustomDate: {
          from: "",
          to: ""
        }
      },
      loading : false
    };
  },
  computed: {
    ...mapGetters(["showBrgys", "reportData","rawData"])
  },
  async mounted() {
    this.$store.dispatch("getBrgys");
  },
  methods: {
    generate() {
      const requestParams = {
        request: "getReportData",
        barangay: this.filterData.filterBarangay,
        filterDateBy: this.filterData.filterDate,
        customDateFrom: this.filterData.filterCustomDate.from,
        customDateTo: this.filterData.filterCustomDate.to
      };

      this.loading = true;

      setTimeout(() => {
        
        this.$store.dispatch("getReportData", requestParams);
        this.loading = false;
      }, 500);

    },
    reset() {
      this.filterData.filterType = "";
      this.filterData.filterDate = "";
      this.filterData.filterBarangay = "";
      this.filterData.filterCustomDate.from = "";
      this.filterData.filterCustomDate.to = "";
      this.filterOptions.customDate = false;
      this.$store.dispatch("resetReport");
    },
    resetBarangay() {
      if (this.filterData.filterType === "All Barangay") {
        this.filterData.filterBarangay = "";
      }
    },
    showCustomdate() {
      this.filterOptions.customDate = !this.filterOptions.customDate;
      this.filterData.filterCustomDate.from = "";
      this.filterData.filterCustomDate.to = "";
    }
  }
};
</script>

<style></style>
