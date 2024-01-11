import { beforeEach, describe, expect, it } from 'vitest';
import { VueWrapper, mount } from '@vue/test-utils';

import AppTile from '../AppTile.vue';

describe('AppTile', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(AppTile, {
      props: { color: 'blue' },
    });
  });

  it('renders properly', () => {
    expect(wrapper).toBeTruthy();
  });

  it('has background color declared in props', () => {
    const tile = wrapper.find('[test-id="tile"]');
    const tileStyles = tile.attributes()['style'].split(';');
    const backgroundColorStyle = tileStyles.find((style) => style.startsWith('background-color'));
    const backgroundColor = backgroundColorStyle?.split(':')[1].trim();

    expect(backgroundColor).toBe('blue');
  });

  it('emits changeColor event after change button click', () => {
    const changeButton = wrapper.find('[test-id="changeButton"]');
    changeButton.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('change-color');
  });

  it('emits delete event after delete button click', () => {
    const deleteButton = wrapper.find('[test-id="deleteButton"]');
    deleteButton.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('delete');
  });
});
