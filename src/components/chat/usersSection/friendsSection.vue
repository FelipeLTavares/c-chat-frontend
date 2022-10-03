<template>
  <div class="friendsSectionContainer">
    <UserCard userName="Felipe" userStatus="Estudando Front-end" MTime="00:00" MUnread="4"/>
    <UserCard userName="Felipe" userStatus="Estudando Front-end" MTime="00:00" MUnread="4"/>
    <UserCard userName="Felipe" userStatus="Estudando Front-end" MTime="00:00" MUnread="4"/>
    <UserCard userName="Felipe" userStatus="Estudando Front-end" MTime="00:00" MUnread="4"/>
    <UserCard userName="Felipe" userStatus="Estudando Front-end" MTime="00:00" MUnread="4"/>
    <UserCard userName="Felipe" userStatus="Estudando Front-end" MTime="00:00" MUnread="4"/>
    <UserCard userName="Felipe" userStatus="Estudando Front-end" MTime="00:00" MUnread="4"/>
    <UserCard userName="Felipe" userStatus="Estudando Front-end" MTime="00:00" MUnread="4"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import UserCard from "../userCard/userCard.vue";

export default defineComponent({
    name: "friendsSection",
    components: { UserCard }
})
</script>

<style scoped lang="scss">
  .friendsSectionContainer{
    height: calc(100vh - 110px);
    background-color: $c-lightblue;
    border-radius: 14px 14px 0px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    padding-top: 20px;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: $c-lightblue; 
  }
  ::-webkit-scrollbar-thumb {
    background: $c-input-gray;
    border-radius: 10px; 
  }
</style>