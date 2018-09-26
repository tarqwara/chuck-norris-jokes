import { fetchCategories, fetchUniqueJokes } from '../api';

export default {
  async fetchCategories({ commit }) {
    commit('setCategories', await fetchCategories());
  },
  async fetchUniqueJokes({ commit }, { category, neededAmount, attempts }) {
    commit('addJokes', {
      category,
      jokes: await fetchUniqueJokes(category, neededAmount, attempts),
    });
  },
};
