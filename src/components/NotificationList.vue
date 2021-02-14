<template>
  <div>
    <b-list-group
      v-for="(notificationData, index) in notificationDatas"
      :key="index"
      class="mb-3"
    >
      <h4 class="m-1 py-3">{{ notificationData.months }}</h4>

      <b-list-group-item
        class="flex-column align-items-start"
        v-for="(notification, index) in notificationData.notifications"
        :key="index"
      >
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{ notification.title }}</h5>
          <small>{{ notification.CREATED_AT }}</small>
        </div>
        <p class="mt-2">{{ notification.content }}</p>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  props: ["notificationDatas"]
};
</script>

<style></style>
