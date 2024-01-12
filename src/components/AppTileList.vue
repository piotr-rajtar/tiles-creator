<template>
  <div :class="style.tileList" @dragenter.prevent @dragover.prevent>
    <AppTile
      v-for="(tile, index) in tiles"
      :key="tile.id"
      :color="tile.color"
      draggable="true"
      test-id="tile"
      @change-color="emits('change-color', tile.id)"
      @delete="tileStore.deleteTile(tile.id)"
      @dragstart="onDragStart(index)"
      @dragend="onDragEnd"
      @dragover.prevent="onDragOver(index)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useTileStore } from '../stores';
import type { Tile } from '../typings';

import AppTile from './AppTile.vue';

const emits = defineEmits<{
  (event: 'change-color', tileId: string): void;
}>();

const tileStore = useTileStore();

const tiles = ref<Tile[]>([...tileStore.tiles]);

tileStore.$subscribe(() => {
  tiles.value = [...tileStore.tiles];
});

const draggedIndex = ref<number | null>(null);

const onDragStart = (index: number) => {
  draggedIndex.value = index;
};

const onDragEnd = () => {
  draggedIndex.value = null;
  tileStore.changeTilesOrder(tiles.value);
};

const onDragOver = (index: number) => {
  const draggedItem = tiles.value[draggedIndex.value!];
  tiles.value.splice(draggedIndex.value!, 1);
  tiles.value.splice(index, 0, draggedItem);
  draggedIndex.value = index;
};
</script>

<style lang="scss" module="style">
.tileList {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 40px;
}
</style>
