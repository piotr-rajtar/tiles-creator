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

  it('sets button type correctly', () => {
    const buttonType = wrapper.find('button').attributes()['type'];
    expect(buttonType).toBe('button');
  });

  it('does not set disabled attribute initially', () => {
    const buttonAttributes = wrapper.find('button').attributes();
    expect(buttonAttributes.disabled).toBeUndefined();
  });

  it('sets disabled attribute correctly', async () => {
    await wrapper.setProps({ disabled: true });
    const buttonAttributes = wrapper.find('button').attributes();
    expect(buttonAttributes.disabled).not.toBeUndefined();
  });
});
