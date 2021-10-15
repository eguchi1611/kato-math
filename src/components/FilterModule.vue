<template>
  <v-list-group :value="true">
    <template v-slot:activator>
      <v-list-item-title v-text="filter.title"></v-list-item-title>
    </template>

    <v-list-item>
      <v-list dense>
        <v-list-item
          v-for="selection in filter.selection"
          :key="selection.value"
        >
          <v-checkbox
            v-model="select"
            :label="selection.name"
            :value="selection.value"
            hide-details
            multiple
            dense
          ></v-checkbox>
        </v-list-item>
      </v-list>
    </v-list-item>
  </v-list-group>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
export default Vue.extend({
  computed: {
    select: {
      get(): string[] {
        return store.state.models[this.filter.title];
      },

      set(value: string[]): void {
        store.commit("setModels", { [this.filter.title]: value });
      },
    },
  },

  props: {
    filter: Object,
  },
});
</script>
