import { beforeEach, describe, expect, it } from 'vitest';
import { VueWrapper, mount } from '@vue/test-utils';

import AppTileList from '../AppTileList.vue';

describe('AppTileList', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(AppTileList, {
      props: {
        initialTiles: [
          { id: '1', color: 'red' },
          { id: '2', color: 'green' },
          { id: '3', color: 'blue' },
        ],
      },
    });
  });

  it('renders properly', () => {
    expect(wrapper).toBeTruthy();
  });

  it('display tile list correctly', () => {
    const tiles = wrapper.findAll('[test-id="tile"]');

    expect(tiles.length).toBe(3);
  });

  it('emits change-order event when dragend triggered', () => {
    const tile = wrapper.find('[test-id="tile"]');
    tile.trigger('dragend');

    expect(wrapper.emitted()).toHaveProperty('change-order');
  });
});
