<template>
  <b-navbar toggleable="lg" type="dark" variant="primary" class="shadow">
    <b-navbar-brand href="/">DIMMAS</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-for="(nav, i) in navs" :key="i" :href="nav.url" active>
          {{ nav.name }}
          <b-badge
            variant="danger"
            v-show="nav.hasBadge && totalNotification != 0"
          >
            {{ totalNotification }}
          </b-badge>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import Navigations from "../services/Navigations";
import API from '../services/API.config';

let source = null;

export default {
  data() {
    return {
      navs: []
    };
  },
  computed:{
    totalNotification(){
      return this.$store.getters["getTotalNotification"];
    }
  },
  mounted() {

    const authCredentials = JSON.parse(
      sessionStorage.getItem("usercredentials")
    );
    const userType = ["cho", "rhu", "brgy"][Number(authCredentials.role_id) - 1];
    this.navs = [...Navigations.[userType]];

    source = new EventSource(`${API.backend_url}/notification/?id=${authCredentials.id}`);

    source.onmessage = event => {
       this.$store.dispatch("setTotalNotification", JSON.parse(event.data).result);
    }

  },
  beforeDestroy(){
    source.close();
  }
};
</script>
