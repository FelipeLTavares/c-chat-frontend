<template>
  <AuthenticationForms></AuthenticationForms>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AuthenticationForms from "../components/Authetication/AuthenticationForms.vue";

export default defineComponent({
  name: "AuthenticationView",
  components: {
    AuthenticationForms,
  },
});
</script>
