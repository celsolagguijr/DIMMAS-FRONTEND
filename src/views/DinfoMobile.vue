<template>
  <div>
    <van-nav-bar :title="title" />
    <content-list :contents="contents" />
    <mobile-nav />
  </div>
</template>

<script>
import ContentList from "../components/ContentList.vue";
import MobileNav from "../components/MobileNav.vue";
import { mapGetters } from "vuex";
export default {
  components: { MobileNav, ContentList },
  props: {
    type: {
      type: String
    }
  },
  computed: {
    ...mapGetters(["contents"]),
    title() {
      this.$store.dispatch("getPosts", this.type);
      return Number(this.type) === 1 ? "DENGUE INFORMATION" : "DENGUE NEWS";
    }
  },
  mounted() {
    this.$store.dispatch("getPosts", this.type);
    // navigator.geolocation.getCurrentPosition(
    //   position => {
    //     console.log(position.coords.latitude);
    //     console.log(position.coords.longitude);
    //   },
    //   error => {
    //     console.log(error.message);
    //   }
    // );
  }
};
</script>
