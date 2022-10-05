<template>
<div class="inputMessage">
  <input type="text" class="IM" placeholder="Digite sua mensagem">
  <button>Enviar <div class="iconeSend"><Send :size="24" /></div> </button>
</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Send from 'vue3-material-design-icons-ts/dist/Send.vue';

export default defineComponent({
  name: "inputMessage",
  components: {
    Send
}
})
</script>

<style scoped lang="scss">
  .inputMessage{
    width: 95%;
    margin: 15px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(150, 169, 186, 0.7);
    border-radius: 14px;
    overflow: hidden;

    input{
      height: 40px;
      background: #FDFDFD;
      border: none;
      padding: 16px;
      flex: 1;
      outline: none;
    }
    button{
      width: 108px;
      height: 40px;
      background: #6588DE;
      color: white;
      font-weight: 600;
      font-size: 12px;
      line-height: 18px;
      border: none;
      border-radius: 14px;
      cursor: pointer;

      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .iconeSend{
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

