import { createLocalVue, mount } from '@vue/test-utils';
import { expect } from 'chai';
import Loader from '@/components/Loader.vue';

const localVue = createLocalVue();

describe('Loader.vue', () => {
  const factory = () => mount(Loader, {
    localVue,
  });

  it('should not show loader at start', () => {
    const wrapper = factory();

    expect(wrapper.find('.loader').isVisible()).to.be.false;
  });

  it('should show loader after 500ms', (done) => {
    const wrapper = factory();

    setTimeout(() => {
      expect(wrapper.find('.loader').isVisible()).to.be.true;
      done();
    }, 500);
  });
});
