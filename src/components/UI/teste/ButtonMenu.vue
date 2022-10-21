<template>
  <div class="text-center">
    <v-menu>
      <template v-slot:activator="{ props }">
        <MenuButton v-bind="props"></MenuButton>
      </template>

      <v-list class="menuu" density="compact">
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          class="menuItem"
        >
          <v-list-item-title v-on:click="item.action" class="MenuItemTitle">{{
            item.title
          }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations } from "vuex";
import MenuButton from "../MenuButton/MenuButton.vue";

export default defineComponent({
  name: "BotaoMenu",
  data() {
    return {
      items: [
        {
          title: "Logout",
          action: () => {
            this.ACCOUNT_LOGOUT();
          },
        },
      ],
    };
  },
  methods: {
    ...mapMutations(["ACCOUNT_LOGOUT"]),
  },
  components: { MenuButton },
});
</script>

<style scoped lang="scss">
.menuu {
  min-width: 150px;
  box-shadow: none;
  border-radius: 14px;
}
.menuItem {
  cursor: pointer;
  border-radius: 12px;
  &:hover {
    background-color: $c-lightblue;
  }
}

.MenuItemTitle {
  font-size: 12px;
}
</style>