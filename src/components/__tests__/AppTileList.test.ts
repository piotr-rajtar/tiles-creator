import { beforeEach, describe, expect, it, vi } from 'vitest';
import { VueWrapper, mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import { useTileStore } from '../../stores';
import type { Tile } from '../../typings';

import AppTileList from '../AppTileList.vue';

describe('AppTileList', () => {
  let wrapper: VueWrapper;

  const testTile: Tile = { id: '1', color: '#FFFFFF' };

  beforeEach(() => {
    wrapper = mount(AppTileList, {
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

  it('display tile list correctly', () => {
    const tiles = wrapper.findAll('[test-id="tile"]');

    expect(tiles.length).toBe(1);
  });

  it('triggers changeTilesOrder action on dragend event', () => {
    const store = useTileStore();

    const tile = wrapper.find('[test-id="tile"]');
    tile.trigger('dragend');

    expect(store.changeTilesOrder).toHaveBeenCalled();
  });

  it('does not trigger changeTilesOrder action on dragend event, when edit mode is on', () => {
    const store = useTileStore();
    store.editedTile = testTile;

    const tile = wrapper.find('[test-id="tile"]');
    tile.trigger('dragend');

    expect(store.changeTilesOrder).not.toHaveBeenCalled();
  });
});
