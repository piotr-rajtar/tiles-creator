import { beforeEach, describe, expect, it, vi } from 'vitest';
import { VueWrapper, mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import { useTileStore } from '../../stores';
import type { Tile } from '../../typings';

import AppTile from '../AppTile.vue';

describe('AppTile', () => {
  let wrapper: VueWrapper;

  const testTile: Tile = { id: '1', color: '#FFFFFF' };

  beforeEach(() => {
    wrapper = mount(AppTile, {
      props: { tile: testTile },
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              tiles: {
                tiles: [testTile],
              },
            },
          }),
        ],
      },
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

    expect(backgroundColor).toBe('rgb(255, 255, 255)');
  });

  it('calls setTileToEdit action after change button click', () => {
    const store = useTileStore();

    const changeButton = wrapper.find('[test-id="changeButton"]');
    changeButton.trigger('click');

    expect(store.setTileToEdit).toHaveBeenCalled();
  });

  it('does not call setTileToEdit action after change button click, when disabled', () => {
    const store = useTileStore();
    store.editedTile = testTile;

    const changeButton = wrapper.find('[test-id="changeButton"]');
    changeButton.trigger('click');

    expect(store.setTileToEdit).not.toHaveBeenCalled();
  });

  it('calls deleteTile action after delete button click', () => {
    const store = useTileStore();

    const deleteButton = wrapper.find('[test-id="deleteButton"]');
    deleteButton.trigger('click');

    expect(store.deleteTile).toHaveBeenCalled();
  });

  it('does not call deleteTile action after delete button click, when disabled', () => {
    const store = useTileStore();
    store.editedTile = testTile;

    const deleteButton = wrapper.find('[test-id="deleteButton"]');
    deleteButton.trigger('click');

    expect(store.deleteTile).not.toHaveBeenCalled();
  });
});
