<template>
  <div>
    <navigation />
    <b-container class="mt-4">
      <user-table :collections="getUsers" @addModal="add" @editModal="edit" />
    </b-container>

    <b-modal
      :id="infoModal.id"
      size="lg"
      :title="infoModal.title"
      @hide="resetInfoModal"
    >
      <b-container class="mb-4">
        <b-alert
          :show="formAlert.show"
          dismissible
          fade
          @dismissed="alertClose"
          :variant="formAlert.alertType"
        >
          {{ formAlert.msg }}
        </b-alert>

        <b-form @submit.prevent="save" ref="formUser" id="form-user">
          <b-form-group label="Fullname">
            <b-form-input type="text" v-model="form.fullName" required />
          </b-form-group>
          <b-form-group label="Username">
            <b-form-input type="text" v-model="form.userName" required />
            <b-form-invalid-feedback :state="validation">
              Your Username must be atleasr 5 charaters long.
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label="User Type">
            <b-form-select v-model="form.userType" required>
              <template #first>
                <b-form-select-option :value="null" disabled
                  >-- Please select an option --</b-form-select-option
                >
              </template>
              <b-form-select-option
                v-for="userType in userTypes"
                :key="userType.id"
                :value="userType.id"
                >{{ userType.USERTYPES }}</b-form-select-option
              >
            </b-form-select>
          </b-form-group>
          <b-form-group label="Barangay" v-if="form.userType == 3">
            <b-form-select v-model="form.barangay" required>
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
          <div class="my-5"></div>
          <b-form-group label="Password" v-if="form.request == 'create'">
            <b-form-input type="password" v-model="form.password" required />
          </b-form-group>
          <b-form-group
            label="Confirm Password"
            v-if="form.request == 'create'"
          >
            <b-form-input
              type="password"
              v-model="form.confirmPassword"
              required
            />
          </b-form-group>
        </b-form>
      </b-container>

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
          @click="$refs.formUser.requestSubmit()"
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
import { mapGetters } from "vuex";
import Navigation from "../components/Navigation.vue";
import UserTable from "../components/UserTable.vue";
export default {
  components: {
    UserTable,
    Navigation
  },
  data() {
    return {
      infoModal: {
        id: "",
        title: "",
        content: ""
      },
      loading: false,
      alertShow: false,
      alertType: "",
      alertMsg: "",
      form: {
        id: null,
        request: "",
        fullName: "",
        userName: "",
        userType: null,
        barangay: null,
        password: "",
        confirmPassword: ""
      },
      userNameAlertType: "",
      formAlert: {
        show: false,
        msg: "",
        alertType: ""
      }
    };
  },
  computed: {
    ...mapGetters(["getUsers", "getUserTypes"]),
    barangays() {
      return this.$store.getters["showBrgys"];
    },
    userTypes() {
      return this.$store.getters["getUserTypes"];
    },
    validation() {
      return this.form.userName.length > 4;
    }
  },
  created() {
    this.$store.dispatch("getUserTypes");
    this.$store.dispatch("getBrgys");
  },
  mounted() {
    this.$store.dispatch("getUsers");
  },
  methods: {
    add(e) {
      this.infoModal.id = "add";
      this.infoModal.title = "Add User";
      this.form.request = "create";
      this.$root.$emit("bv::show::modal", this.infoModal.id, e.target);
    },
    async save(e) {
      e.preventDefault();
      this.loading = true;
      const userNameValidateData = {
        request: "validateUsername",
        username: this.form.userName,
        id: this.form.id
      };

      const userNameValidation = await this.$store.dispatch(
        "validateUsername",
        userNameValidateData
      );

      if (userNameValidation) {
        this.formAlert.msg = "Username is already exist!";
        this.formAlert.alertType = "danger";
        this.formAlert.show = true;
        this.loading = false;
        return;
      }

      if (
        this.form.request === "create" &&
        this.form.password !== this.form.confirmPassword
      ) {
        this.formAlert.msg = "Password and Confirm password not match!";
        this.formAlert.alertType = "danger";
        this.formAlert.show = true;
        this.loading = false;
        return;
      }
      const formData =
        this.form.request === "create"
          ? {
              request: this.form.request,
              name: this.form.fullName,
              username: this.form.userName,
              user_type_id: this.form.userType,
              barangay_id: this.form.barangay,
              password: this.form.password,
              confirmPassword: this.form.confirmPassword
            }
          : {
              id: this.form.id,
              request: this.form.request,
              name: this.form.fullName,
              username: this.form.userName,
              user_type_id: this.form.userType,
              barangay_id: this.form.barangay
            };

      const saveForm = await this.$store.dispatch(this.form.request, formData);

      if (saveForm.status == 200) {
        this.alertType = "success";
        this.alertMsg = saveForm.message;
        this.alertShow = true;
        this.$root.$emit("bv::hide::modal", this.infoModal.id, e.target);
        this.resetInfoModal();
        this.$store.dispatch("getUsers");
      } else {
        this.alertType = "danger";
        this.alertMsg = saveForm.message;
        this.alertShow = true;
      }
      this.loading = false;
      return;
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
      this.infoModal.id = "";

      this.form.id = null;
      this.form.fullName = "";
      this.form.userName = "";
      this.form.userType = 0;
      this.form.barangay = 0;
      this.form.password = "";
      this.form.confirmPassword = "";
    },
    alertClose() {
      this.formAlert.msg = "";
      this.formAlert.alertType = "";
      this.formAlert.show = false;
    },
    edit(requestDatas) {
      this.form.id = requestDatas.datas.id;
      this.form.fullName = requestDatas.datas.FULLNAME;
      this.form.userName = requestDatas.datas.USERNAME;
      this.form.userType = requestDatas.datas.USER_TYPE_ID;
      this.form.barangay = requestDatas.datas.BARANGAY_ID;

      this.infoModal.id = "edit";
      this.infoModal.title = "Edit User";
      this.form.request = "edit";
      this.$root.$emit(
        "bv::show::modal",
        this.infoModal.id,
        requestDatas.button
      );
    }
  }
};
</script>
