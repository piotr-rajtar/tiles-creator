import { beforeEach, describe, expect, it } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';

import { useTileStore } from '../tiles.store';

describe('Tile Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('add tiles', () => {
    const store = useTileStore();
    store.addTile();

    expect(store.tiles.length).toBe(1);
  });

  it('changes tiles order', () => {
    const store = useTileStore();
    store.addTile();
    store.addTile();

    const reversedTiles = [...store.tiles].reverse();
    store.changeTilesOrder(reversedTiles);

    expect(store.tiles).toEqual(reversedTiles);
  });

  it('delete tiles', () => {
    const store = useTileStore();
    store.addTile();
    const tile = store.tiles[0];

    store.deleteTile(tile.id);
    expect(store.tiles.length).toBe(0);
  });
});
