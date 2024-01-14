import { defineStore } from 'pinia';
import { ref } from 'vue';
import { v4 } from 'uuid';

import type { Tile } from '../typings';
import { getRandomColor } from '../utils/getRandomColor';

export const useTileStore = defineStore('tiles', () => {
  const editedTile = ref<Tile | null>(null);
  const tiles = ref<Tile[]>([]);

  const addTile = () => {
    const newTile: Tile = {
      id: v4(),
      color: getRandomColor(),
    };

    tiles.value.push(newTile);
  };

  const changeTilesOrder = (updatedTilesList: Tile[]) => {
    tiles.value = JSON.parse(JSON.stringify(updatedTilesList));
  };

  const closeEditMode = () => {
    editedTile.value = null;
  };

  const deleteTile = (tileId: string) => {
    tiles.value = tiles.value.filter((tile) => tile.id !== tileId);
  };

  const setTileToEdit = (tile: Tile) => {
    editedTile.value = { ...tile };
  };

  const updateTile = (updatedTile: Tile) => {
    tiles.value = tiles.value.map((tile) => {
      if (tile.id !== updatedTile.id) {
        return tile;
      }

      return {
        ...tile,
        color: updatedTile.color,
      };
    });
  };

  return {
    editedTile,
    tiles,
    addTile,
    changeTilesOrder,
    closeEditMode,
    deleteTile,
    setTileToEdit,
    updateTile,
  };
});
