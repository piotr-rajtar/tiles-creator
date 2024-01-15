import { beforeEach, describe, expect, it, vi } from 'vitest';
import { VueWrapper, mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import { useTileStore } from './stores';
import type { Tile } from './typings';

import App from './App.vue';

describe('App', () => {
  let wrapper: VueWrapper;

  const testTile: Tile = { id: '1', color: '#FFFFFF' };

  beforeEach(() => {
    wrapper = mount(App, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              tiles: {
                tiles: [],
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

  it('calls addTile action on add tile button click', () => {
    const store = useTileStore();

    const addTileButton = wrapper.find('[test-id="addTileButton"]');
    addTileButton.trigger('click');

    expect(store.addTile).toHaveBeenCalled();
  });

  it('does not call addTile action on add tile button click, when edit mode in on', async () => {
    const store = useTileStore();
    store.editedTile = testTile;

    await wrapper.vm.$nextTick();

    const addTileButton = wrapper.find('[test-id="addTileButton"]');
    addTileButton.trigger('click');

    expect(store.addTile).not.toHaveBeenCalled();
  });

  it('renders AppTileList, when some tiles added', async () => {
    const store = useTileStore();
    store.tiles = [testTile];

    await wrapper.vm.$nextTick();

    const appTileList = wrapper.find('[test-id="tileList"]');

    expect(appTileList.exists()).toBe(true);
  });

  it('render no tiles info when no tiles added', () => {
    const noTilesInfo = wrapper.find('[test-id="noTilesInfo"]');

    expect(noTilesInfo.exists()).toBe(true);
  });

  it('renders ColorFormModal when edit mode is on', async () => {
    const store = useTileStore();
    store.editedTile = testTile;

    await wrapper.vm.$nextTick();

    const colorFormModal = wrapper.find('[test-id="colorFormModal"]');
    expect(colorFormModal.exists()).toBe(true);
  });
});
