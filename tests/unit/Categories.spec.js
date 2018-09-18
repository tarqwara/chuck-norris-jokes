import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Categories from '@/components/Categories.vue';

describe('Categories.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(Categories, {
      propsData: { msg },
    });
    expect(wrapper.text()).to.include(msg);
  });
});
