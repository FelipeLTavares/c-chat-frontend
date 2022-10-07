<template>
  <div class="profileContainer">
    <div class="userPic"></div>
    <div class="userInfo">
      <span class="userName" @click="consolee()">{{userInfo.user.name}}</span>
      <span class="userStatus">{{userInfo.user.email}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent( {
  name: 'profileSection',
  computed: {
    ...mapState(["userInfo"]),
  },
  
})
</script>

<style scoped lang="scss">
  .profileContainer{
    width: 350px;
    height: 100px;
    background-color: $c-lightblue;
    border-radius: 0px 0px 14px 14px;
    margin-bottom: 10px;

    display: flex;
    align-items: center;
  }
  .userPic{
    background-color: black;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    margin-left: 35px;
  }
  .userInfo{
    min-width: 40px;
    display: flex;
    flex-direction: column;
    margin-left: 15px;
  }
  .userName{
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    color: $c-text-gray;
  }
  .userStatus{
    font-weight: 300;
    font-size: 10px;
    line-height: 15px;
    color: $c-status-gray;
  }
</style>