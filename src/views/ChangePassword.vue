<template>
  <div>
    <navigation />
    <div class="container mt-4">
      <h4>Change Password</h4>

      <div class="row justify-content-center mt-4">
        <form @submit.prevent="save">
          <b-form-group label="Current Password">
            <b-form-input
              type="password"
              v-model="changePasswordForm.oldPassword"
              required
            />
          </b-form-group>
          <b-form-group label="New Password">
            <b-form-input
              type="password"
              v-model="changePasswordForm.newPassword"
              required
            />
          </b-form-group>
          <b-form-group label="Confirm Password">
            <b-form-input
              type="password"
              v-model="changePasswordForm.confirmPassword"
              required
            />
          </b-form-group>

          <b-button type="submit" size="md" variant="primary" block>
            Change Password
          </b-button>
          <div class="mt-2" v-show="loading">
            <b-spinner small variant="primary" label="Spinning"></b-spinner>
            <span class="text-primary ml-2 mr-2" style="font-size: .8em"
              >Please wait...</span
            >
          </div>
        </form>
      </div>
    </div>
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
import Navigation from "../components/Navigation.vue";
import Axios from "axios";
import API from "../services/API.config";
const userURL = `${API.backend_url}/${`user/`}`;

export default {
  components: { Navigation },
  data() {
    return {
      changePasswordForm: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      },
      loading: false,
      alertShow: false,
      alertType: "",
      alertMsg: ""
    };
  },

  methods: {
    async save() {
      this.loading = true;

      if (
        this.changePasswordForm.newPassword !==
        this.changePasswordForm.confirmPassword
      ) {
        this.alertMsg = "New Password not match.";
        this.alertType = "danger";
        this.alertShow = true;
        this.loading = false;
        return;
      }

      if (this.changePasswordForm.newPassword.length < 4) {
        this.alertMsg = "New Password must atleast 4 characters";
        this.alertType = "danger";
        this.alertShow = true;
        this.loading = false;
        return;
      }

      const userCredentials = JSON.parse(
        sessionStorage.getItem("usercredentials")
      );

      const request = {
        id: userCredentials.id,
        oldPassword: this.changePasswordForm.oldPassword,
        newPassword: this.changePasswordForm.newPassword,
        request: "changePassword"
      };

      const result = await Axios.put(userURL, request);

      const { data } = result;

      console.log(data.status);

      if (data.status === 201) {
        this.alertMsg = data.message;
        this.alertType = "success";
        this.alertShow = true;
        this.loading = false;
        setTimeout(() => {
          this.$router.push({ name: "Logout" });
        }, 1000);
      }

      if (data.status === 401) {
        this.alertMsg = data.message;
        this.alertType = "danger";
        this.alertShow = true;
        this.loading = false;
      }

      return;
    }
  }
};
</script>

<style></style>
