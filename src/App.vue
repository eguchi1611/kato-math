<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" clipped app>
      <filter-drawer></filter-drawer>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>加藤の数ラボ</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import FilterDrawer from "./components/FilterDrawer.vue";
import store from "./store";
export default Vue.extend({
  components: { FilterDrawer },
  name: "App",

  data: () => ({
    drawer: null,
  }),

  mounted() {
    store.dispatch("loadAPI");
  },
});
</script>
