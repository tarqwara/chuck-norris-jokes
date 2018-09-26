import { expect } from 'chai';
import getters from '@/store/getters';

describe('getters', () => {
  describe('sortedCategories', () => {
    it('should return categories sorted alphabetically', () => {
      const categories = ['Movie', 'Sport', 'Celebrity'];

      const result = getters.sortedCategories({ categories });

      expect(result[0]).to.eq('Celebrity');
      expect(result[1]).to.eq('Movie');
      expect(result[2]).to.eq('Sport');
    });
  });

  describe('jokesByCategory', () => {
    let joke;
    let jokes;

    beforeEach(() => {
      joke = {
        id: 1,
        value: 'Joke 1',
        favorited: false,
      };
      jokes = {
        Celebrity: [joke],
      };
    });

    it('should return empty array if no jokes by category exist', () => {
      const result = getters.jokesByCategory({ jokes })('Movie');

      expect(result).to.be.empty;
    });

    it('should return jokes array in given category if jokes by category exist', () => {
      const result = getters.jokesByCategory({ jokes })('Celebrity');

      expect(result).to.have.length(1);
      expect(result[0]).to.eq(joke);
    });
  });

  describe('favoriteJokesCount', () => {
    let category;
    let jokesByCategory;
    let state;

    beforeEach(() => {
      category = 'Celebrity';
      state = {};
    });

    it('should return 0 if no jokes in given category', () => {
      jokesByCategory = () => [];

      const result = getters.favoriteJokesCount(state, { jokesByCategory })(category);

      expect(result).to.eq(0);
    });

    it('should return 0 if no favorited jokes in given category', () => {
      jokesByCategory = () => [{
        id: 1,
        value: 'Celebrity Joke 1',
        favorited: false,
      }, {
        id: 2,
        value: 'Celebrity Joke 2',
        favorited: false,
      }];

      const result = getters.favoriteJokesCount(state, { jokesByCategory })(category);

      expect(result).to.eq(0);
    });

    it('should return count of favorited jokes in given category', () => {
      jokesByCategory = () => [{
        id: 1,
        value: 'Celebrity Joke 1',
        favorited: false,
      }, {
        id: 2,
        value: 'Celebrity Joke 2',
        favorited: true,
      }];

      const result = getters.favoriteJokesCount(state, { jokesByCategory })(category);

      expect(result).to.eq(1);
    });
  });
});
