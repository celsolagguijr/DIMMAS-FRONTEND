<template>
  <div>
    <navigation />
    <b-container class="mt-5">
      <div class="row">
        <div class="col-lg-6">
          <div class="d-flex justify-content-between mb-3">
            <h4>
              Requests <span>({{ allRequests.length }})</span>
            </h4>
            <b-button
              size="md"
              variant="primary"
              v-show="userType == 3"
              @click="addRequest"
            >
              Create new request
            </b-button>
          </div>

          <request-list
            :requests="allRequests"
            :userType="userType"
            :editFunction="editRequest"
            :confirmModal="confirmModal"
            :loading="dataReloading"
          />
        </div>
        <div class="col-lg-6">
          <div class="d-flex justify-content-between mb-3">
            <h4>
              Schedules
              <span>({{ schedules.length }})</span>
            </h4>
            <b-button
              size="md"
              variant="primary"
              v-show="userType != 3"
              @click="addSched"
            >
              Create new schedule
            </b-button>
          </div>
          <schedule-list
            :schedules="schedules"
            :userType="userType"
            :reSched="reSched"
            :deleteSchedule="deleteSchedule"
            :doneSchedule="doneSchedule"
            :loading="dataReloading"
          />
        </div>
      </div>
    </b-container>
    <!-- requestModal -->
    <b-modal
      :id="infoModal.id"
      :title="infoModal.title"
      @hide="resetRequestModal"
    >
      <b-form @submit.prevent="save" ref="formRequest" id="form-request">
        <b-form-group label="Request Type">
          <b-form-select v-model="requestForm.request_type" required>
            <template #first>
              <b-form-select-option :value="null" disabled
                >-- Please select an option --</b-form-select-option
              >
            </template>
            <b-form-select-option
              v-for="requestType in requestTypes"
              :key="requestType.id"
              :value="requestType.id"
              >{{ requestType.name }}</b-form-select-option
            >
          </b-form-select>
        </b-form-group>

        <div class="row">
          <div class="col-7">
            <b-form-group label="Date">
              <b-form-input
                type="date"
                v-model="requestForm.date"
                required
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-5">
            <b-form-group label="Time">
              <b-form-input
                type="time"
                v-model="requestForm.time"
                required
              ></b-form-input>
            </b-form-group>
          </div>
        </div>
      </b-form>

      <template #modal-footer="{ cancel }">
        <div class="mt-2" v-show="requestForm.loading">
          <b-spinner small variant="primary" label="Spinning"></b-spinner>
          <span class="text-primary ml-2 mr-2" style="font-size: 0.8em"
            >Please wait...</span
          >
        </div>
        <b-button size="md" variant="light" @click="cancel()">
          Cancel
        </b-button>
        <b-button
          size="md"
          variant="primary"
          @click="$refs.formRequest.requestSubmit()"
        >
          Save
        </b-button>
      </template>
    </b-modal>
    <!-- requestModal 
    -->
    <!-- confirm modal -->
    <b-modal :id="modalConfirmation.id" :title="modalConfirmation.title">
      <b-form
        @submit.prevent="confirm"
        ref="ConfirmationForm"
        id="form-confirmation"
      >
        <h4>{{ confirmForm.question }}</h4>
        <b-form-textarea
          id="textarea-auto-height"
          placeholder="Remarks"
          rows="3"
          max-rows="8"
          v-model="confirmForm.remarks"
          v-if="confirmForm.request === 'requestAction'"
        ></b-form-textarea>
      </b-form>

      <template #modal-footer="{ cancel }">
        <div class="mt-2" v-show="confirmForm.loading">
          <b-spinner small variant="primary" label="Spinning"></b-spinner>
          <span class="text-primary ml-2 mr-2" style="font-size: 0.8em"
            >Please wait...</span
          >
        </div>
        <b-button size="md" variant="light" @click="cancel()">
          Cancel
        </b-button>
        <b-button
          size="md"
          :variant="confirmForm.btnColorVariant"
          @click="$refs.ConfirmationForm.requestSubmit()"
        >
          {{ confirmForm.btnContent }}
        </b-button>
      </template>
    </b-modal>

    <!-- schedule -->
    <b-modal
      :id="scheduleModal.id"
      :title="scheduleModal.title"
      @hide="resetScheduleModal"
    >
      <b-form @submit.prevent="saveSchedule" ref="formSched" id="form-sched">
        <b-form-group
          label="Schedule For"
          v-if="scheduleForm.request === 'create'"
        >
          <b-form-select v-model="scheduleForm.schedule_for" required>
            <template #first>
              <b-form-select-option :value="null" disabled
                >-- Please select an option --</b-form-select-option
              >
            </template>
            <b-form-select-option
              v-for="requestType in requestTypes"
              :key="requestType.id"
              :value="requestType.id"
              >{{ requestType.name }}</b-form-select-option
            >
          </b-form-select>
        </b-form-group>
        <b-form-group
          label="Select Barangay"
          v-if="scheduleForm.request === 'create'"
        >
          <b-form-select v-model="scheduleForm.id" required>
            <template #first>
              <b-form-select-option :value="null" disabled
                >-- Please select an option --</b-form-select-option
              >
            </template>
            <b-form-select-option
              v-for="barangayUser in barangayUsers"
              :key="barangayUser.id"
              :value="barangayUser.id"
              >{{ barangayUser.BARANGAY }} ({{ barangayUser.USER_NAME }})
            </b-form-select-option>
          </b-form-select>
        </b-form-group>

        <h4 v-if="scheduleForm.request == 'destroy'">
          Are you sure you want to cancel it?
        </h4>

        <div class="row" v-if="scheduleForm.request != 'destroy'">
          <div class="col-7">
            <b-form-group label="Date">
              <b-form-input
                type="date"
                v-model="scheduleForm.date"
                required
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-5">
            <b-form-group label="Time">
              <b-form-input
                type="time"
                v-model="scheduleForm.time"
                required
              ></b-form-input>
            </b-form-group>
          </div>
        </div>
        <b-form-textarea
          id="textarea-auto-height"
          placeholder="Remarks"
          rows="3"
          max-rows="8"
          v-model="scheduleForm.remarks"
          v-if="scheduleForm.request === 'create'"
        ></b-form-textarea>
      </b-form>

      <template #modal-footer="{ cancel }">
        <div class="mt-2" v-show="scheduleModal.loading">
          <b-spinner small variant="primary" label="Spinning"></b-spinner>
          <span class="text-primary ml-2 mr-2" style="font-size: 0.8em"
            >Please wait...</span
          >
        </div>
        <b-button size="md" variant="light" @click="cancel()">
          Cancel
        </b-button>
        <b-button
          size="md"
          :variant="scheduleForm.request == 'destroy' ? 'danger' : 'primary'"
          @click="$refs.formSched.requestSubmit()"
        >
          {{ scheduleForm.request == "destroy" ? "Yes" : "Save" }}
        </b-button>
      </template>
    </b-modal>
    <!-- schedule -->

    <b-alert
      v-model="alertShow"
      class="position-fixed fixed-bottom m-0 rounded-0"
      style="z-index: 2000"
      :variant="alertType"
      dismissible
    >
      {{ alertMsg }}
    </b-alert>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Navigation from "../components/Navigation.vue";
import RequestList from "../components/RequestList.vue";
import ScheduleList from "../components/ScheduleList.vue";

export default {
  components: { Navigation, RequestList, ScheduleList },
  data() {
    return {
      userType: 0,
      infoModal: {
        id: "modal-form",
        title: "",
        content: ""
      },
      requestForm: {
        id: null,
        request_type: null,
        request: "",
        loading: false,
        date: null,
        time: null
      },
      confirmForm: {
        id: null,
        request: "",
        question: "",
        loading: false,
        btnColorVariant: "",
        btnContent: "",

        remarks: "",
        action: 0,
        approver_id: 0
      },
      modalConfirmation: {
        id: "modal-confirmation",
        title: "",
        content: ""
      },
      scheduleForm: {
        id: null,
        request: "",
        schedule_for: null,
        date: "",
        time: "",
        remarks: ""
      },
      scheduleModal: {
        id: "modal-schedule",
        title: "",
        content: "",
        loading: false
      },
      alertShow: false,
      alertType: "",
      alertMsg: "",
      dataReloading: false
    };
  },
  computed: {
    ...mapGetters(["allRequests", "requestTypes", "schedules", "barangayUsers"])
  },
  async mounted() {
    this.dataReloading = true;
    const authCredentials = JSON.parse(
      sessionStorage.getItem("usercredentials")
    );

    await this.$store.dispatch("getRequest", {
      request: "show",
      userType: authCredentials.role_id,
      id: authCredentials.id
    });

    this.userType = authCredentials.role_id;

    await this.$store.dispatch("getSchedules", {
      id: authCredentials.id,
      request: "show",
      userType: authCredentials.role_id
    });

    this.$store.dispatch("getRequestTypes");

    this.$store.dispatch("getBarangayUsers");

    this.dataReloading = false;
  },
  methods: {
    addRequest(e) {
      this.infoModal.title = "Add Request";
      this.requestForm.request = "create";
      this.$root.$emit("bv::show::modal", this.infoModal.id, e.target);
    },
    addSched(e) {
      this.scheduleModal.title = "Add Schedule";
      this.scheduleForm.request = "create";
      this.$root.$emit("bv::show::modal", this.scheduleModal.id, e.target);
    },
    editRequest(request) {
      this.infoModal.title = "Edit Request";
      this.requestForm.request_type = request.REQUEST_TYPE_ID;
      this.requestForm.request = "edit";
      this.requestForm.id = request.id;
      this.requestForm.date = request.FORMAT_DATE_SCHED;
      this.requestForm.time = request.FORMAT_TIME_SCHED;
      this.$root.$emit("bv::show::modal", this.infoModal.id);
    },
    confirmModal(confirmType, datas) {
      if (confirmType === "delete") {
        this.confirmForm.id = datas.id;
        this.confirmForm.request = "delete";
        this.confirmForm.question =
          "Are you sure you want to delete this request?";
        this.confirmForm.btnContent = "Confirm";
        this.confirmForm.btnColorVariant = "danger";
      } else if (confirmType === "approved") {
        this.confirmForm.id = datas.id;
        this.confirmForm.request = "requestAction";
        this.confirmForm.action = 1;
        this.modalConfirmation.title = "Please confirm.";
        this.confirmForm.btnContent = "Confirm";
        this.confirmForm.btnColorVariant = "success";
      } else if (confirmType === "disapproved") {
        this.confirmForm.id = datas.id;
        this.confirmForm.request = "requestAction";
        this.confirmForm.action = 2;
        this.modalConfirmation.title = "Please confirm disapproving this";
        this.confirmForm.btnContent = "Confirm";
        this.confirmForm.btnColorVariant = "danger";
      }
      this.$root.$emit("bv::show::modal", this.modalConfirmation.id);
    },
    async save(e) {
      e.preventDefault();
      this.requestForm.loading = true;
      this.dataReloading = true;

      const authCredentials = JSON.parse(
        sessionStorage.getItem("usercredentials")
      );
      let formRequest = null;

      if (this.requestForm.request === "create") {
        formRequest = {
          request: this.requestForm.request,
          request_type_id: this.requestForm.request_type,
          id: authCredentials.id,
          scheduled_date: `${this.requestForm.date} ${this.requestForm.time}`
        };

        const response = await this.$store.dispatch(
          "createRequest",
          formRequest
        );

        this.alertType = response.status === 200 ? "success" : "danger";
        this.alertMsg = response.message;
        this.alertShow = true;

        await this.$store.dispatch("getRequest", {
          request: "show",
          userType: authCredentials.role_id,
          id: authCredentials.id
        });

        this.requestForm.loading = false;
        this.dataReloading = false;

        this.$root.$emit("bv::hide::modal", this.infoModal.id, e.target);
      } else if (this.requestForm.request === "edit") {
        formRequest = {
          request: this.requestForm.request,
          request_type_id: this.requestForm.request_type,
          id: this.requestForm.id,
          scheduled_date: `${this.requestForm.date} ${this.requestForm.time}`
        };

        const response = await this.$store.dispatch(
          "updateRequest",
          formRequest
        );

        this.alertType = response.status === 200 ? "success" : "danger";
        this.alertMsg = response.message;
        this.alertShow = true;

        await this.$store.dispatch("getRequest", {
          request: "show",
          userType: authCredentials.role_id,
          id: authCredentials.id
        });

        this.requestForm.loading = false;
        this.dataReloading = false;
        this.$root.$emit("bv::hide::modal", this.infoModal.id, e.target);
      }

      return;
    },
    async confirm(e) {
      e.preventDefault();

      this.confirmForm.loading = true;
      this.dataReloading = true;
      const authCredentials = JSON.parse(
        sessionStorage.getItem("usercredentials")
      );
      if (this.confirmForm.request === "delete") {
        const response = await this.$store.dispatch("deleteRequest", {
          request: "destroy",
          id: this.confirmForm.id
        });

        this.alertType = response.status === 200 ? "success" : "danger";
        this.alertMsg = response.message;
        this.alertShow = true;

        await this.$store.dispatch("getRequest", {
          request: "show",
          userType: authCredentials.role_id,
          id: authCredentials.id
        });
        this.$root.$emit(
          "bv::hide::modal",
          this.modalConfirmation.id,
          e.target
        );
        this.confirmForm.loading = false;
        this.dataReloading = false;
        return;
      }

      // action

      const action = {
        id: this.confirmForm.id,
        request: this.confirmForm.request,
        approver_id: authCredentials.id,
        action: this.confirmForm.action,
        remarks: this.confirmForm.remarks
      };

      const response = await this.$store.dispatch("requestAction", action);

      this.alertType = response.status === 200 ? "success" : "danger";
      this.alertMsg = response.message;
      this.alertShow = true;

      await this.$store.dispatch("getRequest", {
        request: "show",
        userType: authCredentials.role_id,
        id: authCredentials.id
      });

      await this.$store.dispatch("getSchedules", {
        id: authCredentials.id,
        request: "show",
        userType: authCredentials.role_id
      });

      this.$root.$emit("bv::hide::modal", this.modalConfirmation.id, e.target);

      this.confirmForm.id = 0;
      this.confirmForm.request = "";
      this.confirmForm.question = "";
      this.confirmForm.loading = false;
      this.confirmForm.btnColorVariant = "";
      this.confirmForm.btnContent = "";

      this.confirmForm.remarks = "";
      this.confirmForm.action = 0;
      this.confirmForm.approver_id = 0;

      this.confirmForm.loading = false;
      this.dataReloading = false;
    },
    async saveSchedule(e) {
      e.preventDefault();

      this.scheduleModal.loading = true;
      this.dataReloading = true;

      const authCredentials = JSON.parse(
        sessionStorage.getItem("usercredentials")
      );

      let response = null;

      if (this.scheduleForm.request == "create") {
        response = await this.$store.dispatch("addSchedule", {
          ...this.scheduleForm,
          schedule_by: authCredentials.id
        });
      } else if (this.scheduleForm.request == "reSchedule") {
        response = await this.$store.dispatch("reSchedule", {
          id: this.scheduleForm.id,
          request: this.scheduleForm.request,
          schedule_by: authCredentials.id,
          schedule: `${this.scheduleForm.date} ${this.scheduleForm.time}`
        });
      } else if (this.scheduleForm.request == "destroy") {
        response = await this.$store.dispatch("deleteSchedule", {
          id: this.scheduleForm.id,
          request: this.scheduleForm.request,
          schedule_by: authCredentials.id
        });
      }

      this.alertType = response.status === 200 ? "success" : "danger";
      this.alertMsg = response.message;
      this.alertShow = true;

      this.scheduleModal.loading = false;
      this.dataReloading = false;
      this.resetScheduleModal();

      this.$root.$emit("bv::hide::modal", this.scheduleModal.id);
      this.$store.dispatch("getSchedules", {
        id: authCredentials.id,
        request: "show",
        userType: authCredentials.role_id
      });
    },
    reSched(schedDate) {
      this.scheduleModal.title = "Re-Schedule";
      this.scheduleForm.request = "reSchedule";
      this.scheduleForm.date = schedDate.FORMAT_DATE_SCHED;
      this.scheduleForm.time = schedDate.FORMAT_TIME_SCHED;
      this.scheduleForm.id = schedDate.id;
      this.$root.$emit("bv::show::modal", this.scheduleModal.id);
    },
    deleteSchedule(sched) {
      this.scheduleModal.title = "Delete Schedule";
      this.scheduleForm.request = "destroy";
      this.scheduleForm.id = sched.id;
      this.$root.$emit("bv::show::modal", this.scheduleModal.id);
    },
    async doneSchedule(sched) {
      this.dataReloading = true;
      const authCredentials = JSON.parse(
        sessionStorage.getItem("usercredentials")
      );
      const response = await this.$store.dispatch("doneSchedule", {
        id: sched.id,
        request: "isDone"
      });

      this.alertType = response.status === 200 ? "success" : "danger";
      this.alertMsg = response.message;
      this.alertShow = true;

      this.$store.dispatch("getSchedules", {
        id: authCredentials.id,
        request: "show",
        userType: authCredentials.role_id
      });
      this.dataReloading = false;
    },
    resetRequestModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
      this.loading = false;
      this.requestForm.request_type = null;
      this.requestForm.request = "";
      this.requestForm.date = "";
      this.requestForm.time = "";
    },
    resetScheduleModal() {
      this.scheduleForm.id = null;
      this.scheduleForm.request = "";
      this.scheduleForm.schedule_for = null;
      this.scheduleForm.date = "";
      this.scheduleForm.time = "";
      this.scheduleForm.remarks = "";
      this.scheduleModal.loading = false;
    }
  }
};
</script>
