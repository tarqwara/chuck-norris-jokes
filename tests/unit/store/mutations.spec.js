import { expect } from 'chai';
import mutations from '@/store/mutations';

describe('mutations', () => {
  let state;

  describe('showCategories', () => {
    it('should set categoriesVisible state to true', () => {
      state = {
        categoriesVisible: false,
      };

      expect(state.categoriesVisible).to.be.false;

      mutations.showCategories(state);

      expect(state.categoriesVisible).to.be.true;
    });
  });

  describe('hideCategories', () => {
    it('should set categoriesVisible state to false', () => {
      state = {
        categoriesVisible: true,
      };

      expect(state.categoriesVisible).to.be.true;

      mutations.hideCategories(state);

      expect(state.categoriesVisible).to.be.false;
    });
  });

  describe('setCategories', () => {
    it('should set categories state', () => {
      state = {
        categories: [],
      };
      const categories = ['Celebrity', 'Movie', 'Sport'];

      expect(state.categories).to.be.empty;

      mutations.setCategories(state, categories);

      expect(state.categories).to.eq(categories);
    });
  });

  describe('addJokes', () => {
    beforeEach(() => {
      state = {
        jokes: {
          Celebrity: [{
            id: 1,
            value: 'Celebrity Joke',
            favorited: false,
          }],
        },
      };
    });

    it('should add jokes to an existing category if the category exists in jokes state', () => {
      const joke = {
        id: 2,
        value: 'Celebrity Joke 2',
      };

      expect(state.jokes.Celebrity).to.have.length(1);

      mutations.addJokes(state, {
        category: 'Celebrity',
        jokes: [joke],
      });

      expect(state.jokes.Celebrity).to.have.length(2);
      expect(state.jokes.Celebrity[1]).to.eq(joke);
    });

    it('should add jokes to a new category if the category does not exist in jokes state', () => {
      const joke = {
        id: 3,
        value: 'Movie Joke',
      };

      expect(state.jokes.Movie).to.be.undefined;

      mutations.addJokes(state, {
        category: 'Movie',
        jokes: [joke],
      });

      expect(state.jokes.Movie).to.have.length(1);
      expect(state.jokes.Movie[0]).to.eq(joke);
    });

    it('should set favorited to false for every added joke', () => {
      const joke = {
        id: 2,
        value: 'Celebrity Joke 2',
      };

      expect(joke.favorited).to.be.undefined;

      mutations.addJokes(state, {
        category: 'Celebrity',
        jokes: [joke],
      });

      expect(joke.favorited).to.be.false;
    });
  });
});
