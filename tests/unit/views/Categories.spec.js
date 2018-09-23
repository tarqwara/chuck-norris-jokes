import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import { expect, spy, use } from 'chai';
import spies from 'chai-spies';
import Vuex from 'vuex';
import Categories from '@/components/Categories.vue';
import Category from '@/components/Category.vue';

use(spies);

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Categories.vue', () => {
  let state;
  let getters;
  let mutations;
  let store;
  let $route;

  const factory = () => {
    store = new Vuex.Store({
      state,
      getters,
      mutations,
    });
    $route = {
      params: {},
    };

    return shallowMount(Categories, {
      localVue,
      store,
      mocks: {
        $route,
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
  };

  beforeEach(() => {
    state = {
      categoriesVisible: true,
    };
    getters = {
      sortedCategories: () => [
        'Celebrity',
        'Movie',
        'Sport',
      ],
    };
    mutations = {
      showCategories: spy(),
      hideCategories: spy(),
    };
  });

  it('showCategories mutation should be called on mounting when category route param does not exist', () => {
    factory();

    expect(mutations.showCategories).to.have.been.called;
  });

  it('showCategories mutation should not be called on mounting when category route param exists', () => {
    $route = {
      params: {
        category: 'Movie',
      },
    };
    factory();

    expect(mutations.showCategories).not.to.have.been.called;
  });

  it('categories should have open class when categories are visible', () => {
    const wrapper = factory();

    expect(wrapper.find('.categories').classes().includes('open')).to.be.true;
  });

  it('categories should not have open class when categories are not visible', () => {
    state = {
      categoriesVisible: false,
    };
    const wrapper = factory();

    expect(wrapper.find('.categories').classes().includes('open')).to.be.false;
  });

  it('categories should be displayed as components', () => {
    const wrapper = factory();

    expect(wrapper.find('.categories').findAll(Category)).to.have.length(3);
    expect(wrapper.find('.categories').findAll(Category).at(0).attributes().category).to.eq('Celebrity');
    expect(wrapper.find('.categories').findAll(Category).at(1).attributes().category).to.eq('Movie');
    expect(wrapper.find('.categories').findAll(Category).at(2).attributes().category).to.eq('Sport');
  });

  it('clicking category link should call hideCategories mutation', () => {
    const wrapper = factory();

    wrapper.find('.categories').find(RouterLinkStub).trigger('click');

    expect(mutations.hideCategories).to.have.been.called;
  });
});
