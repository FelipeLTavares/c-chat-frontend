<template>
  <div class="profileContainer">
    <div class="userPic"></div>
    <div class="userInfo">
      <span class="userName">{{ userInfo.user.name }}</span>
      <span class="userStatus">{{ userInfo.user.email }}</span>
    </div>
    <ProfileMenu class="menuBtn"></ProfileMenu>
    <!-- <ButtonMenu class="menuBtn"></ButtonMenu> -->
  </div>
</template>
 
<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";
import ButtonMenu from "../../../UI/MenuButton/MenuButton.vue";
import ProfileMenu from "@/components/UI/ProfileMenu/ProfileMenu.vue";

export default defineComponent({
  name: "profileSection",
  computed: {
    ...mapState(["userInfo"]),
  },
  components: { ProfileMenu },
});
</script>

<style scoped lang="scss">
@import "./profileSection.scss";
</style>