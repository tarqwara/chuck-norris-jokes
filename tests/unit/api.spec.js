import axios from 'axios';
import { use, expect } from 'chai';
import { stub } from 'sinon';
import sinonChai from 'sinon-chai';
import { fetchCategories, fetchUniqueJokes } from '@/api';

use(sinonChai);

describe('api', () => {
  describe('fetchCategories', () => {
    let categories;

    beforeEach(() => {
      categories = ['Celebrity', 'Movie', 'Sport'];
      stub(axios, 'get').resolves({
        data: categories,
      });
    });

    afterEach(() => {
      axios.get.restore();
    });

    it('should fetch categories', (done) => {
      const promise = fetchCategories();

      expect(axios.get).to.have.been.calledWith('https://api.chucknorris.io/jokes/categories');
      promise.then((response) => {
        expect(response).to.eq(categories);
        done();
      });
    });
  });

  describe('fetchUniqueJokes', () => {
    let joke1;
    let joke2;
    let joke3;

    beforeEach(() => {
      joke1 = {
        id: 1,
        value: 'Joke 1',
      };
      joke2 = {
        id: 2,
        value: 'Joke 2',
      };
      joke3 = {
        id: 3,
        value: 'Joke 3',
      };
      stub(axios, 'get');
      axios.get.onCall(0).resolves({
        data: joke1,
      });
      axios.get.onCall(1).resolves({
        data: joke2,
      });
      axios.get.onCall(2).resolves({
        data: joke3,
      });
    });

    afterEach(() => {
      axios.get.restore();
    });

    it('response should contain accumulated jokes after no attempts left', (done) => {
      const promise = fetchUniqueJokes('movie', 3, 1);

      promise.then((response) => {
        expect(response).to.have.length(1);
        expect(response[0]).to.eq(joke1);
        done();
      });
    });

    it('response should contain needed amount of unique jokes', (done) => {
      const promise = fetchUniqueJokes('movie', 2, 10);

      promise.then((response) => {
        expect(response).to.have.length(2);
        expect(response[0]).to.eq(joke1);
        expect(response[1]).to.eq(joke2);
        done();
      });
    });

    it('response should not contain duplicate jokes', (done) => {
      axios.get.onCall(1).resolves({
        data: joke1,
      });

      const promise = fetchUniqueJokes('movie', 2, 10);

      promise.then((response) => {
        expect(response).to.have.length(2);
        expect(response[0]).to.eq(joke1);
        expect(response[1]).to.eq(joke3);
        done();
      });
    });
  });
});
