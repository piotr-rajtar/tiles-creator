import { defineStore } from 'pinia';
import { ref } from 'vue';
import { v4 } from 'uuid';

import type { Tile } from '../typings';
import { getRandomColor } from '../utils/getRandomColor';

export const useTileStore = defineStore('tiles', () => {
  const tiles = ref<Tile[]>([]);

  const addTile = () => {
    const newTile: Tile = {
      id: v4(),
      color: getRandomColor(),
    };

    tiles.value.push(newTile);
  };

  const changeTilesOrder = (updatedTilesList: Tile[]) => {
    tiles.value = updatedTilesList;
  };

  const deleteTile = (tileId: string) => {
    tiles.value = tiles.value.filter((tile) => tile.id !== tileId);
  };

  return { tiles, addTile, changeTilesOrder, deleteTile };
});
