<template>
  <div>
    <navigation />
    <b-container class="mt-5">
      <barangay-table :collections="showBrgys" />
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Navigation from "../components/Navigation";
import BarangayTable from "../components/BarangayTable.vue";

export default {
  name: "Barangay",
  components: {
    Navigation,
    BarangayTable
  },
  computed: {
    ...mapGetters(["showBrgys"])
  },
  async mounted() {
    this.loading = true;
    this.$store.dispatch("getBrgys");
    this.loading = false;
  }
};
</script>

<style lang="css"></style>
