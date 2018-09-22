import Vue from 'vue';
import Vuex from 'vuex';
import { fetchCategories, fetchUniqueJokes } from './api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: [],
    jokes: {},
    categoriesVisible: false,
  },
  mutations: {
    showCategories(state) {
      state.categoriesVisible = true;
    },
    hideCategories(state) {
      state.categoriesVisible = false;
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
    addJokes(state, { category, jokes }) {
      if (!state.jokes[category]) {
        Vue.set(state.jokes, category, []);
      }

      jokes.forEach((joke) => {
        Vue.set(joke, 'favorited', false);
        state.jokes[category].push(joke);
      });
    },
  },
  actions: {
    async fetchCategories({ commit }) {
      commit('setCategories', await fetchCategories());
    },
    async fetchUniqueJokes({ commit }, { category, neededAmount, attempts }) {
      commit('addJokes', {
        category,
        jokes: await fetchUniqueJokes(category, neededAmount, attempts),
      });
    },
  },
  getters: {
    sortedCategories: state => state.categories.sort(),
    jokesByCategory: ({ jokes }) => category => jokes[category] || [],
  },
});
