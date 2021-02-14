<template>
  <b-container>
    <b-row fluid="xl" class="vh-100">
      <b-col></b-col>
      <b-col lg="4" md="6" sm="12" xs="12" class="align-self-center">
        <b-card
          border-variant="primary"
          header="Login into DIMMAS"
          header-bg-variant="primary"
          header-text-variant="white"
          class="shadow"
        >
          <b-alert
            :show="dismissCountDown"
            dismissible
            fade
            :variant="alertType"
            @dismiss-count-down="countDownChanged"
          >
            {{ msg }}
          </b-alert>

          <b-form @submit.prevent="edit" ref="loginForm" id="login-form">
            <b-form-group id="input-group-1">
              <b-input-group>
                <b-input-group-prepend is-text>
                  <b-icon icon="person-fill"></b-icon>
                </b-input-group-prepend>
                <b-form-input
                  type="text"
                  placeholder="Username"
                  v-model="form.username"
                  autocomplete="off"
                  required
                ></b-form-input>
              </b-input-group>
            </b-form-group>

            <b-form-group id="input-group-2">
              <b-input-group>
                <b-input-group-prepend is-text>
                  <b-icon icon="lock-fill"></b-icon>
                </b-input-group-prepend>
                <b-form-input
                  type="password"
                  placeholder="Password"
                  v-model="form.password"
                  required
                ></b-form-input>
              </b-input-group>
            </b-form-group>

            <div class="d-flex justify-content-end">
              <div class="mt-2" v-show="loading">
                <b-spinner small variant="primary" label="Spinning"></b-spinner>
                <span class="text-primary ml-2 mr-2" style="font-size: .8em"
                  >Logging in...</span
                >
              </div>

              <b-button
                variant="primary"
                @click="$refs.loginForm.requestSubmit()"
              >
                Login
                <b-icon icon="arrow-right-square"></b-icon>
              </b-button>
            </div>
          </b-form>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      loading: false,
      msg: "",
      dismissSecs: 5,
      dismissCountDown: 0,
      alertType: "",
      form: {
        request: "auth",
        username: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions(["AUTH"]),
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    async edit(e) {
      e.preventDefault();

      this.loading = true;

      const auth_result = await this.AUTH(this.form);

      if (auth_result.status === 200) {
        this.loading = false;
        this.alertType = "success";
        this.msg = auth_result.message;
        this.showAlert();
        sessionStorage.setItem(
          "usercredentials",
          JSON.stringify(auth_result.payload)
        );
        this.$router.push({ name: "Dashboard" });
        return;
      }

      this.loading = false;
      this.alertType = "danger";
      this.msg = auth_result.message;
      this.showAlert();
      return;
    }
  }
};
</script>
