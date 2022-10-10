<template>
  <div class="testando">
    <button @click="testando()">TESTE</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";
import Vaidarcerto from "@/functions/arquivodeteste";

export default defineComponent({
  name: "TesteComp",
  data() {
    return {
      nome: this.userInfo,
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },

  methods: {
    ...mapMutations(["SET_USER_INFO"]),
    testando() {
      Vaidarcerto();
    },
  },
});
</script>

<style>
</style>