<template>
  <AuthenticationForms></AuthenticationForms>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

import AuthenticationForms from "../components/Authetication/AuthenticationForms.vue";

export default defineComponent({
  name: "AuthenticationView",
  components: {
    AuthenticationForms,
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    isLoggedIn(){
      if( this.userInfo.isLoggedIn ){
        this.$router.push('/chat')
      }
    }
  },
  mounted(){
    this.isLoggedIn()
  }
});
</script>
