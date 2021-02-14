<template>
  <div>
    <navigation />

    <b-container class="mt-5">
      <h4 class="mb-4">Notifications</h4>
      <b-row>
        <b-col lg="6" class="mb-3">
          <b-button
            size="md"
            class="mb-md-3 mb-sm-3 mb-xs-3"
            variant="primary"
            @click="clear"
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
                  v-model="form.from"
                  @change="filter"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col lg="6">
              <b-form-group label-for="to" label="To">
                <b-form-input
                  id="to"
                  type="date"
                  v-model="form.to"
                  @change="filter"
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
    <b-container class="mb-2">
      <notification-list :notificationDatas="getNotifications" />

      <div class="d-flex justify-content-center">
        <b-spinner
          variant="primary"
          label="Spinning"
          v-if="loading"
        ></b-spinner>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Navigation from "../components/Navigation.vue";
import NotificationList from "../components/NotificationList.vue";

export default {
  components: {
    Navigation,
    NotificationList
  },
  data() {
    return {
      form: {
        id: 0,
        from: null,
        to: null
      },
      loading: false
    };
  },
  computed: {
    ...mapGetters(["getNotifications"])
  },
  async mounted() {
    this.loading = true;
    const authCredentials = JSON.parse(
      sessionStorage.getItem("usercredentials")
    );
    await this.$store.dispatch("getNotifications", { id: authCredentials.id });
    this.loading = false;
  },
  methods: {
    async filter() {
      const authCredentials = JSON.parse(
        sessionStorage.getItem("usercredentials")
      );
      this.form.id = authCredentials.id;

      if (
        this.form.from == null ||
        this.form.to == null ||
        new Date(this.form.from) > new Date(this.form.to)
      )
        return;

      this.loading = true;
      await this.$store.dispatch("getNotifications", this.form);
      this.loading = false;
    },
    clear() {
      this.form.id = null;
      this.form.from = null;
      this.form.to = null;
      this.$store.dispatch("resetNotifications");
    }
  }
};
</script>
