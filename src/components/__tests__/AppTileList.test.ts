import { beforeEach, describe, expect, it, vi } from 'vitest';
import { VueWrapper, mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import { useTileStore } from '../../stores';

import AppTileList from '../AppTileList.vue';

describe('AppTileList', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(AppTileList, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              tiles: {
                tiles: [
                  {
                    id: '1',
                    color: 'red',
                  },
                ],
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
});
