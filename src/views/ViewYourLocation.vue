<template>
  <div>
    <van-nav-bar title="DIMMAS" />
    <google-map-mobile
      :markers="showBrgys"
      :lat="currentLocation.lat"
      :lng="currentLocation.lng"
    />
    <mobile-nav />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import GoogleMapMobile from "../components/GoogleMapMobile.vue";
import MobileNav from "../components/MobileNav.vue";

const defaultLocation = { lat: 16.9351916, lng: 121.7743975 };

export default {
  components: { MobileNav, GoogleMapMobile },
  data() {
    return {
      currentLocation: { lat: 0, lng: 0 }
    };
  },
  created() {
    this.$store.dispatch("getBrgys");
  },
  mounted: function() {
    this.geolocation();
  },
  computed: {
    ...mapGetters(["showBrgys"])
  },
  methods: {
    geolocation: function() {
      var self = this;

      navigator.geolocation.getCurrentPosition(function(position) {
        self.currentLocation.lat = position.coords.latitude;
        self.currentLocation.lng = position.coords.longitude;
      });

      if (this.currentLocation.lat === 0 || this.currentLocation.lng === 0) {
        this.currentLocation.lat = defaultLocation.lat;
        this.currentLocation.lng = defaultLocation.lng;
      }
    }
  }
};
</script>
