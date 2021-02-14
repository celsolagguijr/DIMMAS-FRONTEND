<template>
  <div>
    <b-list-group
      v-for="recordOfDailyCase in recordOfDailyCases"
      :key="recordOfDailyCase"
      class="mb-3"
    >
      <h4 class="m-1 py-3">{{ recordOfDailyCase.month }}</h4>

      <b-list-group-item
        class="flex-column align-items-start"
        v-for="dailyCase in recordOfDailyCase.dailyCases"
        :key="dailyCase"
      >
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{ dailyCase.BARANGAY }}</h5>
          <small>{{ dailyCase.CASE_DATE }}</small>
        </div>

        <div class="d-flex mt-1">
          <p class="mr-4">
            Cases :
            <b-badge variant="danger">{{ dailyCase.TOTAL_CASES }}</b-badge>
          </p>
          <p class="mr-4">
            Recoveries :
            <b-badge variant="success">
              {{ dailyCase.TOTAL_RECOVERIES }}
            </b-badge>
          </p>
          <p class="mr-4">
            Deaths :
            <b-badge variant="dark"> {{ dailyCase.TOTAL_DEATHS }} </b-badge>
          </p>
        </div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  props: ["recordOfDailyCases"]
};
</script>

<style></style>
