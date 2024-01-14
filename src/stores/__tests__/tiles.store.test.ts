import { beforeEach, describe, expect, it } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';

import type { Tile } from '../../typings';

import { useTileStore } from '../tiles.store';

describe('Tile Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('adds tiles', () => {
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

  it('closes edit mode', () => {
    const store = useTileStore();
    store.setTileToEdit({ id: '1', color: '#FFFFFF' });
    store.closeEditMode();

    expect(store.editedTile).toBeNull();
  });

  it('deletes tiles', () => {
    const store = useTileStore();
    store.addTile();
    const tile = store.tiles[0];

    store.deleteTile(tile.id);
    expect(store.tiles.length).toBe(0);
  });

  it('sets tile to edit', () => {
    const store = useTileStore();
    store.setTileToEdit({ id: '1', color: '#FFFFFF' });

    expect(store.editedTile).toBeTruthy();
    expect(store.editedTile!.id).toBe('1');
    expect(store.editedTile!.color).toBe('#FFFFFF');
  });

  it('updates tile', () => {
    const store = useTileStore();
    store.addTile();

    const updatedTile: Tile = { ...store.tiles[0], color: '#000000' };
    store.updateTile(updatedTile);

    expect(store.tiles[0].color).toBe('#000000');
  });
});
