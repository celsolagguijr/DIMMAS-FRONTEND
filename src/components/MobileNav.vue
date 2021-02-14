<template>
  <van-tabbar route v-model="active">
    <van-tabbar-item replace to="/mobile-home" icon="wap-home-o"
      >Home</van-tabbar-item
    >
    <van-tabbar-item replace to="/mobile-dinfo/1" icon="info-o"
      >D-Info</van-tabbar-item
    >
    <van-tabbar-item replace to="/mobile-dinfo/2" icon="chat-o"
      >D-News</van-tabbar-item
    >
    <van-tabbar-item replace to="/mobile-mylocation" icon="warning-o"
      >D-Alert</van-tabbar-item
    >
  </van-tabbar>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  }
};
</script>
