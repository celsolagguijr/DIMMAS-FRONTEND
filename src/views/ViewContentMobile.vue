<template>
  <div>
    <van-nav-bar
      left-text="Back"
      left-arrow
      :title="category"
      @click-left="$router.back()"
    />
    <van-panel :title="title" :desc="created_by" :status="posted_date">
      <div v-html="content" class="p-3 mt-3 mb-5 text-justify"></div>
    </van-panel>
    <mobile-nav />
  </div>
</template>

<script>
import MobileNav from "../components/MobileNav.vue";
export default {
  components: { MobileNav },
  data() {
    return {
      title: "",
      content: "",
      created_by: "",
      posted_date: "",
      category: ""
    };
  },
  props: {
    id: {
      type: String
    }
  },
  async mounted() {
    const response = await this.$store.dispatch("getinformation", this.id);
    this.title = `Title : ${response.title}`;
    this.content = response.content;
    this.posted_date = response.created_at;
    this.created_by = `Posted By: ${response.posted_by}`;
    this.category = response.category;
  }
};
</script>

<style></style>
