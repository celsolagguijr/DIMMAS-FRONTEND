<template>
  <b-row class="mb-4">
    <b-col lg="4" class="pb-2">
      <b-card bg-variant="danger" text-variant="white" class="text-center">
        <h1>
          {{ cases }}
        </h1>
        <div class="text-center" style="font-size:1em">
          Total Dengue Cases
        </div>
      </b-card>
    </b-col>
    <b-col lg="4" class="pb-2">
      <b-card bg-variant="success" text-variant="white">
        <h1 class="text-center">
          {{ recovery }}
        </h1>
        <div class="text-center" style="font-size:1em">
          Total Recoveries
        </div>
      </b-card>
    </b-col>
    <b-col lg="4" class="pb-2">
      <b-card bg-variant="dark" text-variant="white">
        <h1 class="text-center">
          {{ death }}
        </h1>
        <div class="text-center" style="font-size:1em">
          Total Deaths
        </div>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    totalCase: {
      type: String
    },
    totalRecoveries: {
      type: String
    },
    totalDeaths: {
      type: String
    }
  },
  computed: {
    cases() {
      return this.totalCase;
    },
    recovery() {
      return this.totalRecoveries;
    },
    death() {
      return this.totalDeaths;
    }
  }
};
</script>
