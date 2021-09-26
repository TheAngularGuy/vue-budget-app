import Home from '@/pages/Home.vue';
import { shallowMount } from '@vue/test-utils';

describe('Home.vue', () => {
  it('should be created and truthy', () => {
    const wrapper = shallowMount(Home, {});
    expect(wrapper.text()).toBeTruthy();
  });
});
