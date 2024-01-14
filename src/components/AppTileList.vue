<template>
  <div :class="style.tileList" @dragenter.prevent @dragover.prevent>
    <AppTile
      v-for="(tile, index) in tiles"
      :key="tile.id"
      :tile="tile"
      draggable="true"
      test-id="tile"
      @dragstart="onDragStart(index)"
      @dragend="onDragEnd"
      @dragover.prevent="onDragOver(index)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import { useTileStore } from '../stores';
import type { Tile } from '../typings';

import AppTile from './AppTile.vue';

const tileStore = useTileStore();
const { editedTile } = storeToRefs(useTileStore());

const tiles = ref<Tile[]>(JSON.parse(JSON.stringify(tileStore.tiles)));

tileStore.$subscribe(() => {
  tiles.value = JSON.parse(JSON.stringify(tileStore.tiles));
});

const draggedIndex = ref<number | null>(null);

const onDragStart = (index: number) => {
  if (editedTile.value) {
    return;
  }

  draggedIndex.value = index;
};

const onDragEnd = () => {
  if (editedTile.value) {
    return;
  }

  draggedIndex.value = null;
  tileStore.changeTilesOrder(tiles.value);
};

const onDragOver = (index: number) => {
  if (editedTile.value) {
    return;
  }

  const draggedItem = tiles.value[draggedIndex.value!];
  tiles.value.splice(draggedIndex.value!, 1);
  tiles.value.splice(index, 0, draggedItem);
  draggedIndex.value = index;
};
</script>

<style lang="scss" module="style">
@use '../scss/spacings.scss';

.tileList {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 6 * spacings.$spacing-unit;
}
</style>
