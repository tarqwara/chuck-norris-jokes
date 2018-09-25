import { createLocalVue, mount } from '@vue/test-utils';
import { expect } from 'chai';
import Vuex from 'vuex';
import '@/font-awesome';
import Category from '@/components/Category.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Category.vue', () => {
  let getters;
  let store;

  const factory = () => {
    store = new Vuex.Store({
      getters,
    });

    return mount(Category, {
      localVue,
      store,
      propsData: {
        category: 'Movie',
      },
    });
  };

  beforeEach(() => {
    getters = {
      favoriteJokesCount: () => () => 2,
    };
  });

  it('category name should be displayed', () => {
    const wrapper = factory();

    expect(wrapper.find('.name').text()).to.eq('Movie');
  });

  it('favorited count should not be shown if count is 0', () => {
    getters.favoriteJokesCount = () => () => 0;
    const wrapper = factory();

    expect(wrapper.find('.fa-layers').exists()).to.be.false;
  });

  it('favorited count should be shown if count is over 0', () => {
    const wrapper = factory();

    expect(wrapper.find('.fa-layers').exists()).to.be.true;
    expect(wrapper.find('.fa-layers-text').text()).to.eq('2');
  });
});
