<template>
  <div>
    <Navigation />
    <b-container class="mt-4">
      <h4>Select Report</h4>

      <b-list-group class="mb-4">
        <b-list-group-item>
          <a href="/reports">Dengue Case Report</a>
        </b-list-group-item>
        <b-list-group-item
          ><a href="/request-report">Request Report </a></b-list-group-item
        >
        <b-list-group-item
          ><a href="/schedule-report">Schedule Report </a></b-list-group-item
        >
      </b-list-group>

      <h4>Schedule Report</h4>
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
                <label for="">Date Filter</label>
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
            <hr />

            <div class="row mt-2 mb-2">
              <div class="col-lg-3 col-md-12 col-sm-12 m-1">
                <b-button variant="primary" type="submit" block
                  >Generate</b-button
                >
              </div>
              <div class="col-lg-3 col-md-12 col-sm-12 m-1">
                <button class="btn btn-primary w-100" @click="savedPDF">
                  Download
                </button>
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
          <b-table
            bordered
            fixed
            no-border-collapse
            :items="scheduleReport"
            :fields="fields"
            head-variant="light"
            small
            style="font-size:.9rem"
            responsive
          ></b-table>
        </b-card-body>
      </b-card>

      <b-alert
        v-model="alertShow"
        class="position-fixed fixed-bottom m-0 rounded-0"
        style="z-index: 2000;"
        :variant="alertType"
        dismissible
      >
        {{ alertMsg }}
      </b-alert>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Navigation from "../components/Navigation";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
  components: { Navigation },
  data() {
    return {
      filterOptions: {
        types: ["All Barangay", "Choose Barangay"],
      },
      filterData: {
        filterType: "",
        filterDate: "",
        filterBarangay: "",
        filterCustomDate: {
          from: "",
          to: "",
        },
      },
      loading: false,
      alertShow: false,
      alertType: "",
      alertMsg: "",
      fields: [
        {
          key: "SCHED_FOR",
          label: "Scheduled For",
        },
        {
          key: "SCHED_TO",
          label: "Scheduled To",
        },
        {
          key: "SCHED_BY",
          label: "Scheduled By",
        },
        {
          key: "REMARKS",
          label: "Remarks",
        },
        {
          key: "STATUS",
          label: "Status",
        },
        {
          key: "SCHEDULED_DATE",
          label: "Scheduled Date",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["showBrgys", "scheduleReport"]),
  },
  async mounted() {
    this.$store.dispatch("getBrgys");
  },
  methods: {
    generate() {
      const requestParams = {
        request: "schedReport",
        barangay_id: this.filterData.filterBarangay,
        filterFrom: this.filterData.filterCustomDate.from,
        filterTo: this.filterData.filterCustomDate.to,
      };

      if (
        requestParams.customDateFrom !== "" &&
        requestParams.customDateTo !== ""
      ) {
        if (
          new Date(requestParams.customDateTo).getTime() <
          new Date(requestParams.customDateFrom)
        ) {
          (this.alertShow = true),
            (this.alertType = "danger"),
            (this.alertMsg = "Date To must greater than Date From"),
            (this.loading = false);
          return;
        }
      }

      this.loading = true;

      setTimeout(() => {
        this.$store.dispatch("generateScheduleReport", requestParams);
        (this.alertShow = false),
          (this.alertType = "false"),
          (this.alertMsg = ""),
          (this.loading = false);
      }, 500);
    },
    reset() {
      this.filterData.filterType = "";
      this.filterData.filterDate = "";
      this.filterData.filterBarangay = "";
      this.filterData.filterCustomDate.from = "";
      this.filterData.filterCustomDate.to = "";
      this.alertShow = false;
      this.alertType = "";
      this.alertMsg = "";
      this.$store.dispatch("resetScheduleReport");
    },
    resetBarangay() {
      if (this.filterData.filterType === "All Barangay") {
        this.filterData.filterBarangay = "";
      }
    },
    savedPDF() {
      const doc = new jsPDF();

      const rawData = this.$store.getters["scheduleReport"];
      let body = [...rawData.map((data) => [...Object.values(data)])];

      doc.text("Schedule Report", 10, 20);

      doc.autoTable({
        margin: { top: 30 },
        head: [[...this.fields.map((data) => data.label)]],
        body: [...body],
      });

      doc.save("Report.pdf");
    },
  },
};
</script>

<style></style>
