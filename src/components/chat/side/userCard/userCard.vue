<template>
  <div class="userCardContainer">
    <div class="userPic"></div>
    <div class="cardInfo">
      <div class="userInfo">
        <span class="userName">{{userName}}</span>
        <span class="userStatus">{{userStatus}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'userCard',
  props:{
    userName:String,
    userStatus: String,
    MTime: String,
    MUnread: String
  }
}
</script>

<style scoped lang="scss">
  .userCardContainer{
    width: 310px;
    height: 74px;
    background-color: $c-royalblue-01;
    border-radius: 14px;
    display: flex;
    justify-items: flex-start;
    margin: 10px;

    display: flex;
    align-items: center;
  }
  .userPic{
    background-color: black;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    margin: 15px;
  }
  .userInfo{
    min-width: 40px;
    display: flex;
    flex-direction: column;
  }
  .cardInfo{
    width: 221px;
    display: flex;
    justify-content: space-between;
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