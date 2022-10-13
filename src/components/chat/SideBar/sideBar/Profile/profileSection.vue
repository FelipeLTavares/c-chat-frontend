<template>
  <div class="profileContainer">
    <div class="userPic"></div>
    <div class="userInfo">
      <span class="userName">{{ userInfo.user.name }}</span>
      <span class="userStatus">{{ userInfo.user.email }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "profileSection",
  computed: {
    ...mapState(["userInfo"]),
  },
});
</script>

<style scoped lang="scss">
@import "./profileSection.scss";
</style>