<template>
  <div>
    <navigation />

    <b-container class="mt-5">
      <b-row>
        <b-col lg="6" class="mb-3">
          <b-button
            size="md"
            class="mb-md-3 mb-sm-3 mb-xs-3"
            variant="primary"
            @click="add"
            >Add new record</b-button
          >
          <b-button
            size="md"
            class="mb-md-3 mb-sm-3 mb-xs-3 ml-2"
            variant="light"
            @click="clearFilter"
            >Clear Filter</b-button
          >
        </b-col>
        <b-col lg="6">
          <b-row>
            <b-col lg="6">
              <b-form-group label-for="from" label="From">
                <b-form-input
                  id="from"
                  type="date"
                  v-model="filterValues.from"
                  @change="filterDate"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col lg="6">
              <b-form-group label-for="to" label="To">
                <b-form-input
                  id="to"
                  type="date"
                  v-model="filterValues.to"
                  @change="filterDate"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>

    <b-container>
      <hr />
    </b-container>

    <b-container>
      <record-list :recordOfDailyCases="dailyCases" v-show="!loadRecords" />

      <div class="d-flex justify-content-center">
        <b-spinner
          variant="primary"
          label="Spinning"
          v-if="loadRecords"
        ></b-spinner>
      </div>
    </b-container>

    <b-modal :id="infoModal.id" :title="infoModal.title" @hide="resetInfoModal">
      <b-form @submit.prevent="save" ref="formCase" id="form-case">
        <b-form-group label="Total Cases">
          <b-form-input
            type="number"
            v-model="form.total_cases"
            min="0"
            step="1"
            required
          />
        </b-form-group>
        <b-form-group label="Total Deaths">
          <b-form-input
            type="number"
            v-model="form.total_deaths"
            min="0"
            step="1"
            required
          />
        </b-form-group>
        <b-form-group label="Total Recoveries">
          <b-form-input
            type="number"
            v-model="form.total_recoveries"
            min="0"
            step="1"
            required
          />
        </b-form-group>

        <b-form-group label="Barangay">
          <b-form-select v-model="form.brgy_id" required>
            <template #first>
              <b-form-select-option :value="null" disabled
                >-- Please select an option --</b-form-select-option
              >
            </template>
            <b-form-select-option
              v-for="barangay in barangays"
              :key="barangay.id"
              :value="barangay.id"
              >{{ barangay.name }}</b-form-select-option
            >
          </b-form-select>
        </b-form-group>

        <b-form-group label="Date">
          <b-form-input
            type="date"
            v-model="form.case_date"
            required
          ></b-form-input>
        </b-form-group>
      </b-form>

      <template #modal-footer="{ cancel }">
        <div class="mt-2" v-show="loading">
          <b-spinner small variant="primary" label="Spinning"></b-spinner>
          <span class="text-primary ml-2 mr-2" style="font-size: .8em"
            >Please wait...</span
          >
        </div>
        <b-button size="md" variant="light" @click="cancel()">
          Cancel
        </b-button>
        <b-button
          size="md"
          variant="primary"
          @click="$refs.formCase.requestSubmit()"
        >
          Save
        </b-button>
      </template>
    </b-modal>
    <b-alert
      v-model="alertShow"
      class="position-fixed fixed-bottom m-0 rounded-0"
      style="z-index: 2000;"
      :variant="alertType"
      dismissible
    >
      {{ alertMsg }}
    </b-alert>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Navigation from "../components/Navigation.vue";
import RecordList from "../components/RecordsList.vue";

export default {
  components: {
    Navigation,
    RecordList
  },
  data() {
    return {
      loading: false,
      alertShow: false,
      alertType: "",
      alertMsg: "",
      infoModal: {
        id: "modal-form",
        title: "",
        content: ""
      },
      form: {
        total_cases: "",
        total_deaths: "",
        total_recoveries: "",
        case_date: "",
        request: "",
        created_by: 0,
        brgy_id: null
      },
      filterValues: {
        from: null,
        to: null
      },
      loadRecords: false
    };
  },
  methods: {
    ...mapActions(["addCase", "getDailyCases", "resetRecords"]),
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
      this.form.total_cases = "";
      this.form.total_deaths = "";
      this.form.total_recoveries = "";
      this.form.case_date = "";
      this.form.brgy_id = null;
      this.alertType = "";
      this.alertMsg = "";
      this.alertShow = false;
    },
    add(e) {
      this.infoModal.title = "Add Case";
      this.form.request = "addCase";
      this.$root.$emit("bv::show::modal", this.infoModal.id, e.target);
    },
    save(e) {
      e.preventDefault();
      this.loading = true;

      if (
        this.form.total_cases < 0 ||
        this.form.total_deaths < 0 ||
        this.form.total_recoveries < 0
      ) {
        this.alertType = "danger";
        this.alertMsg = "Cases cannot be negative values.";
        this.alertShow = true;
        this.loading = false;
        return;
      }

      const enteredCase = this.form.case_date;
      const dateNow = new Date(this.dateNow());
      const caseDate = new Date(enteredCase);

      if (dateNow.getTime() < caseDate.getTime()) {
        this.alertType = "danger";
        this.alertMsg = "Date case cannot be ahead of today's date";
        this.alertShow = true;
        this.loading = false;
        return;
      }

      setTimeout(async () => {
        const response = await this.addCase(this.form);
        this.alertType = response.data.status === 200 ? "success" : "danger";
        this.alertMsg = response.data.message;
        this.alertShow = true;
        this.loading = false;
        this.form.total_cases = "";
        this.form.total_deaths = "";
        this.form.total_recoveries = "";
        this.form.case_date = "";
        this.form.brgy_id = null;
      }, 500);
    },
    filterDate() {
      if (this.filterValues.from !== null && this.filterValues.to !== null) {
        if (
          new Date(this.filterValues.to).getTime() <
          new Date(this.filterValues.from)
        ) {
          (this.alertShow = true),
            (this.alertType = "danger"),
            (this.alertMsg = "Date To must greater than Date From"),
            (this.loading = false);
          return;
        }
      }

      this.loadRecords = true;

      setTimeout(() => {
        this.getDailyCases(this.filterValues);
        this.loadRecords = false;
        (this.alertShow = false),
          (this.alertType = ""),
          (this.alertMsg = ""),
          (this.loading = false);
      }, 500);
    },
    clearFilter() {
      this.filterValues.from = null;
      this.filterValues.to = null;
      this.resetRecords();
    },
    dateNow() {
      const today = new Date();
      const dd = today.getDate();
      let mm = today.getMonth() + 1;
      mm = mm < 10 ? `0${mm}` : mm;
      const yyyy = today.getFullYear();
      return `${yyyy}-${mm}-${dd}`;
    }
  },
  created() {
    this.$store.dispatch("getBrgys");
  },
  mounted() {
    const authCredentials = JSON.parse(
      sessionStorage.getItem("usercredentials")
    );
    this.form.created_by = authCredentials.id;
  },

  computed: {
    ...mapGetters(["dailyCases"]),
    barangays() {
      return this.$store.getters["showBrgys"];
    }
  }
};
</script>
