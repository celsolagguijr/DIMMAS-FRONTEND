<template>
  <van-list v-model="loading" :finished="finished" finished-text="">
    <van-cell
      v-for="content in contents"
      :key="content.id"
      :title="content.TITLE"
      @click="viewInformation(content.id)"
    />
  </van-list>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false
    };
  },
  props: ["contents"],
  watch: {
    contents() {
      this.loading = true;
      this.finished = false;
      setTimeout(() => {
        this.loading = false;
        this.finished = true;
        return this.contents;
      }, 1000);
    }
  },
  methods: {
    viewInformation(id) {
      this.$router.push({ name: "ViewContentMobile", params: { id } });
    }
  }
};
</script>

<style></style>
