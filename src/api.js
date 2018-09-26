import axios from 'axios';

const API_URL = 'https://api.chucknorris.io/jokes';

export const fetchCategories = async () => {
  const response = await axios.get(`${API_URL}/categories`);
  return response.data;
};

const fetchJoke = async (category) => {
  const response = await axios.get(`${API_URL}/random?category=${category}`);
  return response.data;
};

/**
 * Fetches unique jokes from API.
 * Not very efficient, since the fetches have to be synchronous in order
 * to determine when the correct amount of unique jokes have been fetched.
 * @param {string} category - joke category
 * @param {number} neededAmount - needed amount of jokes to fetch
 * @param {number} attempts - number of attempts to fetch unique jokes
 * @param {Object[]} jokes - fetched jokes
 * @returns {Promise<*>} - Promise of fetched jokes
 */
export const fetchUniqueJokes = async (category, neededAmount, attempts, jokes = []) => {
  if (attempts <= 0 || jokes.length >= neededAmount) {
    return Promise.resolve(jokes);
  }

  const joke = await fetchJoke(category);
  const jokeExists = jokes.some(j => j.id === joke.id);
  if (!jokeExists) {
    jokes.push(joke);
  }
  return fetchUniqueJokes(category, neededAmount, attempts - 1, jokes);
};
