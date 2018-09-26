export default {
  sortedCategories: ({ categories }) => categories.sort(),
  jokesByCategory: ({ jokes }) => category => jokes[category] || [],
  favoriteJokesCount: (state, { jokesByCategory }) => category =>
    jokesByCategory(category)
      .filter(joke => joke.favorited)
      .length,
};
