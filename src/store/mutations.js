import Vue from 'vue';

export default {
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
};
