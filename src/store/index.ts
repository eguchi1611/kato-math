import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loading: false,
    items: [] as Lesson[],
    options: {
      showAll: false,
    },
    models: {} as { [key: string]: string[] },
    filters: [
      {
        title: "カテゴリー",
        selection: [
          {
            name: "授業",
            value: "lesson",
          },
          {
            name: "節末問題",
            value: "section",
          },
          {
            name: "章末問題",
            value: "chapter",
          },
        ],
        filter:
          (selection: string[]) =>
          (value: Lesson): boolean => {
            const title = value.title;
            let flag = false;
            selection.map((option) => {
              if (flag) return;
              if (
                option === "lesson" &&
                !title.startsWith("節末問題") &&
                !title.startsWith("章末問題")
              ) {
                flag = true;
              }
              if (option === "section" && title.startsWith("節末問題")) {
                flag = true;
              }
              if (option === "chapter" && title.startsWith("章末問題")) {
                flag = true;
              }
            });
            return flag;
          },
      },
      {
        title: "単元",
        selection: [],
        filter:
          (selection: string[]) =>
          (value: Lesson): boolean => {
            let flag = false;
            selection.map((option) => {
              if (flag) return;
              if (value.unit === option) flag = true;
            });
            return flag;
          },
      },
    ],
  },
  getters: {
    getItems: (state) => {
      let array = state.items.filter((value) => {
        if (state.options.showAll) return true;
        return value.print.length || value.slide.length || value.movie.length;
      });
      state.filters.map((val) => {
        if (val.title in state.models && state.models[val.title].length) {
          array = array.filter(val.filter(state.models[val.title] as []));
        }
      });
      return array;
    },
  },
  mutations: {
    setModels: (state, c) =>
      (state.models = Object.assign({}, state.models, c)),

    clearFilter: (state) => (state.models = {}),

    setOptions: (state, o) => {
      state.options = Object.assign({}, state.options, o);
    },

    load(state) {
      const raw = localStorage.getItem("store");
      if (raw) {
        const store = JSON.parse(raw);
        this.replaceState(Object.assign(state, store));
      }
    },
  },
  actions: {
    async loadAPI(context) {
      context.state.loading = true;
      const data = (
        await axios.get(
          "https://script.google.com/macros/s/AKfycbzfnZEXKC2bq2hJ77FPkDubnov0SrlRVqTi0cwz5SKJA2W7MzSTIL07VSre0yADWVC7/exec"
        )
      ).data as Lesson[];
      context.state.items = data;
      const set: Set<string> = new Set();
      data.forEach((value) => set.add(value.unit));
      (
        context.state.filters.find((val) => val.title === "単元") ??
        ({} as { [key: string]: string })
      ).selection = Array.from(set).map((value) => ({
        name: value,
        value: value,
      }));
      context.state.loading = false;
    },
  },
  modules: {},
});

store.subscribe((_mutation, state) => {
  // eslint-disable-next-line
  const { filters, items, ...p } = state;
  localStorage.setItem("store", JSON.stringify(p));
});

export default store;

interface Lesson {
  unit: string;
  no: string;
  title: string;
  print: string[];
  slide: string[];
  movie: string[];
}
