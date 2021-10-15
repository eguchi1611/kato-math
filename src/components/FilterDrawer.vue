<template>
  <v-list nav dense expand>
    <v-list-item>
      <v-btn text small @click="clearFilter()">フィルターをリセット</v-btn>
    </v-list-item>

    <filter-module
      v-for="filter in filters"
      :key="filter.title"
      :filter="filter"
    ></filter-module>
  </v-list>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import FilterModule from "@/components/FilterModule.vue";
export default Vue.extend({
  computed: {
    filters: () => store.state.filters,
  },

  methods: {
    clearFilter() {
      store.commit("clearFilter");
    },
  },

  components: { FilterModule },
});
</script>
