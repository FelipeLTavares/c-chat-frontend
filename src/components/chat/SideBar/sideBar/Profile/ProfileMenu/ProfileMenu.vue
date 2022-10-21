<template>
  <v-list>
    <v-list-item v-for="(item, index) in items" :key="index">
      <v-list-item-title>{{ item.title }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>
export default {};
</script>

<style>
</style>