<template>
  <div>
    <div v-show="requests.length <= 0 && !loading">
      <h6>No request found</h6>
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
        v-for="(request, i) in requests"
        :key="i"
      >
        <h5 class="mb-4 mt-2">Request Details</h5>
        <div class="ml-2">
          <p class="p-0 m-0">Requesting For : {{ request.REQUEST_TYPE }}</p>
          <p class="p-0 m-0" v-show="userType != 3">
            Requested By : Brgy. {{ request.BARANGAY }} |
            {{ request.CREATED_BY }}
          </p>
          <p class="p-0 m-0">Date Request : {{ request.DATE_SCHEDULE }}</p>
          <p class="p-0 m-0">Created At : {{ request.DATE_CREATED }}</p>
        </div>
        <hr />
        <div class="m-0 p-0" v-show="userType != 3">
          <b-button
            size="md"
            variant="success"
            @click="confirmModal('approved', request)"
          >
            Approve
          </b-button>
          <b-button
            class="text-danger ml-2"
            size="md"
            variant="light"
            @click="confirmModal('disapproved', request)"
          >
            Disapproved
          </b-button>
        </div>
        <div class="m-0 p-0" v-show="userType == 3">
          <b-button size="md" variant="success" @click="editFunction(request)">
            Edit
          </b-button>
          <b-button
            size="md"
            class="ml-2"
            variant="danger"
            @click="confirmModal('delete', request)"
          >
            Delete
          </b-button>
        </div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  props: ["requests", "userType", "editFunction", "confirmModal", "loading"]
};
</script>

<style></style>
