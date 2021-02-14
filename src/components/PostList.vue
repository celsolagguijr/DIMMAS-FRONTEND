<template>
  <div>
    <div v-show="posts.length <= 0 && !loading">
      <h6>No post found</h6>
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
        v-for="(post, i) in posts"
        :key="i"
      >
        <h5 class="mb-4 mt-2">Post Details</h5>
        <div class="ml-2">
          <p class="p-0 m-0">Title : {{ post.TITLE }}</p>
          <p class="p-0 m-0">Category : {{ post.CATEGORY_NAME }}</p>
          <p class="p-0 m-0">Posted By: {{ post.POSTED_BY }}</p>
          <p class="p-0 m-0">Created At : {{ post.DATE_CREATED }}</p>
        </div>
        <hr />
        <div class="m-0 p-0">
          <b-button size="md" variant="success" @click="editContent(post)">
            Edit
          </b-button>
          <b-button
            size="md"
            class="ml-2"
            variant="danger"
            @click="deleteContent(post)"
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
  props: ["posts", "loading", "editContent", "deleteContent"]
};
</script>

<style></style>
