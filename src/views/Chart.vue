<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="items"
      :loading="loading"
      no-data-text="データがありません"
      loading-text="読み込み中..."
      disable-sort
      class="elevation-1 mx-auto"
      style="max-width: 1000px"
      dense
    >
      <template v-slot:[`item.links`]="{ item }">
        <template v-for="url in item.print">
          <v-btn :key="url" :href="url" target="_blank" icon
            ><v-icon>mdi-file-document</v-icon></v-btn
          >
        </template>
        <template v-for="url in item.slide">
          <v-btn :key="url" :href="url" target="_blank" icon
            ><v-icon>mdi-presentation</v-icon></v-btn
          >
        </template>
        <template v-for="url in item.movie">
          <v-btn :key="url" :href="url" target="_blank" icon
            ><v-icon>mdi-movie</v-icon></v-btn
          >
        </template>
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
export default Vue.extend({
  data: () => ({
    headers: [
      { text: "単元", value: "unit" },
      { text: "No", value: "no" },
      { text: "タイトル", value: "title" },
      { text: "リンク", value: "links" },
    ],
  }),

  computed: {
    items: () => store.getters.getItems,

    loading: () => store.state.loading,
  },
});
</script>
