import { createLocalVue, shallowMount } from '@vue/test-utils';
import { expect, use } from 'chai';
import { spy } from 'sinon';
import sinonChai from 'sinon-chai';
import Vuex from 'vuex';
import Home from '@/views/Home.vue';
import Categories from '@/components/Categories.vue';
import Loader from '@/components/Loader.vue';

use(sinonChai);

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Home.vue', () => {
  let actions;
  let store;

  const factory = () => {
    actions = {
      fetchCategories: spy(),
    };

    store = new Vuex.Store({
      actions,
    });

    return shallowMount(Home, {
      localVue,
      store,
      stubs: ['router-view'],
    });
  };

  it('should show loader by default', () => {
    const wrapper = factory();

    expect(wrapper.find(Loader).exists()).to.be.true;
  });

  it('should fetch categories when created', () => {
    factory();

    expect(actions.fetchCategories).to.have.been.called;
  });

  it('should hide loader and show categories and router-view after categories are fetched', (done) => {
    const wrapper = factory();

    wrapper.vm.$nextTick(() => {
      expect(wrapper.find(Loader).exists()).to.be.false;
      expect(wrapper.find('router-view-stub').exists()).to.be.true;
      expect(wrapper.find(Categories).exists()).to.be.true;
      done();
    });
  });
});
