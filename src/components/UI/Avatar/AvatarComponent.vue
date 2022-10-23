<template>
  <div class="AvatarContainer">
    <v-avatar
      class="avatarLetter"
      color="primary"
      size="52"
      v-show="!avatarUrl"
    >
      <span>{{ componentName[0] }}</span>
    </v-avatar>
    <img
      class="avatarPic"
      :src="avatarUrl"
      :alt="componentName"
      v-show="avatarUrl"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AvatarComponent",
  props: {
    avatarUrl: String,
    componentName: String,
  },
});
</script>

<style lang="scss" src="./AvatarComponent.scss" />