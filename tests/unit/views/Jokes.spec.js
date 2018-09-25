import { createLocalVue, shallowMount } from '@vue/test-utils';
import { expect, use } from 'chai';
import { spy } from 'sinon';
import sinonChai from 'sinon-chai';
import Vuex from 'vuex';
import Jokes from '@/views/Jokes.vue';
import Category from '@/components/Category.vue';
import Loader from '@/components/Loader.vue';

use(sinonChai);

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Jokes.vue', () => {
  let state;
  let mutations;
  let actions;
  let getters;
  let store;
  let $route;
  let $router;

  const factory = ({ methods } = {}) => {
    store = new Vuex.Store({
      state,
      mutations,
      actions,
      getters,
    });
    return shallowMount(Jokes, {
      localVue,
      store,
      methods,
      mocks: {
        $route,
        $router,
      },
      stubs: ['fa-icon'],
    });
  };

  beforeEach(() => {
    state = {
      categories: [
        'Celebrity',
        'Movie',
        'Sport',
      ],
    };
    actions = {
      fetchUniqueJokes: spy(),
    };
    getters = {
      jokesByCategory: () => () => [],
    };
    mutations = {
      showCategories: spy(),
    };
    $route = {
      params: {
        category: 'Movie',
      },
    };
    $router = {
      push: spy(),
    };
  });

  it('should not show jokes if category route param does not exist', () => {
    $route.params.category = null;
    const wrapper = factory();

    expect(wrapper.find('.jokes').exists()).to.be.false;
  });

  it('should show jokes if category route param exists', () => {
    const wrapper = factory();

    expect(wrapper.find('.jokes').exists()).to.be.true;
  });

  it('selected category button should call showCategories mutation when clicked', () => {
    const wrapper = factory();

    wrapper.find('.selected-category').trigger('click');

    expect(mutations.showCategories).to.have.been.called;
  });

  it('selected category should change when route param category changes', () => {
    const wrapper = factory();

    expect(wrapper.vm.selectedCategory).to.eq('Movie');
    expect(wrapper.find(Category).attributes().category).to.eq('Movie');

    $route.params.category = 'Celebrity';
    expect(wrapper.vm.selectedCategory).to.eq('Celebrity');
    expect(wrapper.find(Category).attributes().category).to.eq('Celebrity');
  });

  it('loader should be shown by default', () => {
    const wrapper = factory();

    expect(wrapper.find(Loader).exists()).to.be.true;
  });

  it('fetchUniqueJokes method should be triggered when component is created', () => {
    const fetchUniqueJokes = spy();
    factory({
      methods: {
        fetchUniqueJokes,
      },
    });

    expect(fetchUniqueJokes).to.have.been.called;
  });

  it('fetchUniqueJokes method should redirect to home when selected category is not in stored categories', () => {
    $route.params.category = 'blablabla';
    factory();

    expect($router.push).to.have.been.calledWith({ name: 'home' });
  });

  it('fetchUniqueJokes method should not trigger fetchUniqueJokes action when store contains jokes by selected category', () => {
    getters.jokesByCategory = () => () => [{
      id: 1,
      value: 'Movie joke',
      favorited: false,
    }];
    factory();

    expect(actions.fetchUniqueJokes).to.have.not.been.called;
  });

  it('fetchUniqueJokes method should trigger fetchUniqueJokes action when store does not contain jokes by selected category', () => {
    factory();

    expect(actions.fetchUniqueJokes).to.have.been.called;
  });

  it('jokes by category should be displayed', () => {
    getters.jokesByCategory = () => () => [{
      id: 1,
      value: 'Movie joke 1',
      favorited: false,
    }, {
      id: 2,
      value: 'Movie joke 2',
      favorited: false,
    }];
    const wrapper = factory();

    const jokes = wrapper.findAll('.joke');
    expect(jokes.at(0).find('.text').text()).to.eq('Movie joke 1');
    expect(jokes.at(1).find('.text').text()).to.eq('Movie joke 2');
  });

  it('clicking favorite icon should favorite when the joke is not already favorited', () => {
    const joke = {
      id: 1,
      value: 'Movie joke 1',
      favorited: false,
    };
    getters.jokesByCategory = () => () => [joke];
    const wrapper = factory();

    wrapper.find('.favorite-icon').trigger('click');

    expect(joke.favorited).to.be.true;
  });

  it('clicking favorite icon should unfavorite when the joke is already favorited', () => {
    const joke = {
      id: 1,
      value: 'Movie joke 1',
      favorited: true,
    };
    getters.jokesByCategory = () => () => [joke];
    const wrapper = factory();

    wrapper.find('.favorite-icon').trigger('click');
    expect(joke.favorited).to.be.false;
  });

  it('favorite icon should not have class favorited when joke is not favorited', () => {
    const joke = {
      id: 1,
      value: 'Movie joke 1',
      favorited: false,
    };
    getters.jokesByCategory = () => () => [joke];
    const wrapper = factory();

    expect(wrapper.find('fa-icon-stub').classes().includes('favorited')).to.be.false;
  });

  it('favorite icon should have class favorited when joke is favorited', () => {
    const joke = {
      id: 1,
      value: 'Movie joke 1',
      favorited: true,
    };
    getters.jokesByCategory = () => () => [joke];
    const wrapper = factory();

    expect(wrapper.find('fa-icon-stub').classes().includes('favorited')).to.be.true;
  });
});
