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
    addUniqueJokes(state, { category, jokes }) {
      // state.jokes[category] = state.jokes[category] || [];
      // jokes.forEach((joke) => {
      //   const jokeExists = state.jokes[category].some(j => j.id === joke.id);
      //   if (!jokeExists) {
      //     state.jokes[category].push(joke);
      //   }
      // });
      state.jokes[category] = [
        ...(state.jokes[category] || []),
        ...jokes,
      ];
    },
  },
  actions: {
    async fetchCategories({ commit }) {
      commit('setCategories', await fetchCategories());
    },
    async fetchUniqueJokes({ commit }, { category, neededAmount, attempts }) {
      commit('addUniqueJokes', {
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
