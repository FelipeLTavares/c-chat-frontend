<template>
  <div class="profileContainer">
    <AvatarComponent
      class="avatar"
      :componentName="userInfo.user.name"
      :avatarUrl="userInfo.user.avatarUrl"
    />
    <div class="userInfo">
      <span class="userName">{{ userInfo.user.name }}</span>
      <span class="userStatus">{{ userInfo.user.email }}</span>
    </div>
    <ProfileMenu class="menuBtn"></ProfileMenu>
  </div>
</template>
 
<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";
import ProfileMenu from "@/components/UI/ProfileMenu/ProfileMenu.vue";
import AvatarComponent from "@/components/UI/Avatar/AvatarComponent.vue";

export default defineComponent({
  name: "profileSection",
  computed: {
    ...mapState(["userInfo"]),
  },
  components: { ProfileMenu, AvatarComponent },
});
</script>

<style scoped lang="scss">
@import "./profileSection.scss";
</style>