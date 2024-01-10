import { beforeEach, describe, expect, it } from 'vitest';
import { VueWrapper, mount } from '@vue/test-utils';

import { buttonVariant } from '../../typings';

import AppButton from '../AppButton.vue';

describe('AppButton', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(AppButton, {
      props: { variant: buttonVariant.danger },
      slots: { default: 'Title' },
    });
  });

  it('renders properly', () => {
    expect(wrapper).toBeTruthy();
  });

  it('renders title correctly', () => {
    const buttonTitle = wrapper.find('button').text();
    expect(buttonTitle).toBe('Title');
  });
});
