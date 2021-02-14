<template>
  <div>
    <div v-show="schedules.length <= 0 && !loading">
      <h6>No schedule found</h6>
    </div>

    <div class="mt-2" v-show="loading">
      <b-spinner small variant="primary" label="Spinning"></b-spinner>
      <span class="text-primary ml-2 mr-2" style="font-size: 0.8em"
        >Please wait...</span
      >
    </div>

    <b-list-group class="mb-3">
      <b-list-group-item
        class="flex-column align-items-start"
        v-for="(schedule, i) in schedules"
        :key="i"
      >
        <h5 class="mb-4 mt-2">Schedule Details</h5>
        <div class="ml-2">
          <p class="p-0 m-0">Requesting For : {{ schedule.SCHEDULED_FOR }}</p>
          <p class="p-0 m-0" v-show="userType != 3">
            Requested By : Brgy. {{ schedule.BARANGAY_SCHED }}
          </p>
          <p class="p-0 m-0" v-show="userType != 3">
            Scheduled By : {{ schedule.SCHEDULER }}
          </p>
          <p class="p-0 m-0">Schedule : {{ schedule.SCHEDULED_DATE }}</p>
          <p class="p-0 m-0">Created At : {{ schedule.CREATED_AT }}</p>
          <b-form-textarea
            class="mt-3"
            placeholder="Remarks"
            rows="3"
            max-rows="8"
            :value="schedule.REMARKS"
            disabled
          ></b-form-textarea>
        </div>
        <hr v-show="userType != 3" />
        <div class="m-0 p-0" v-show="userType != 3">
          <b-button size="md" variant="primary" @click="doneSchedule(schedule)">
            Done
          </b-button>
          <b-button
            class="ml-2 text-success"
            size="md"
            variant="light"
            @click="reSched(schedule)"
          >
            Reschedule
          </b-button>
          <b-button
            class="text-danger ml-2"
            size="md"
            variant="light"
            @click="deleteSchedule(schedule)"
          >
            Cancel
          </b-button>
        </div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  props: [
    "schedules",
    "userType",
    "reSched",
    "deleteSchedule",
    "doneSchedule",
    "loading"
  ]
};
</script>

<style></style>
