<template>
  <div class="profileContainer">
    <div class="userPic"></div>
    <div class="userInfo">
      <span class="userName">{{ userInfo.user.name }}</span>
      <span class="userStatus">{{ userInfo.user.email }}</span>
    </div>
    <ButtonMenu class="menuBtn"></ButtonMenu>
  </div>
</template>
 
<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";
import ButtonMenu from "../../../../UI/teste/ButtonMenu.vue";

export default defineComponent({
  name: "profileSection",
  computed: {
    ...mapState(["userInfo"]),
  },
  components: { ButtonMenu },
});
</script>

<style scoped lang="scss">
@import "./profileSection.scss";
</style>