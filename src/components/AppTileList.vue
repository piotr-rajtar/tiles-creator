<template>
  <div :class="style.tileList" @dragenter.prevent @dragover.prevent>
    <AppTile
      v-for="(tile, index) in tiles"
      :key="tile.id"
      :color="tile.color"
      draggable="true"
      test-id="tile"
      @change-color="emits('change-color', tile.id)"
      @delete="emits('delete', tile.id)"
      @dragstart="onDragStart(index)"
      @dragend="onDragEnd"
      @dragover.prevent="onDragOver(index)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, toRaw, toRefs, watch } from 'vue';

import type { Tile } from '../typings';

import AppTile from './AppTile.vue';

const props = defineProps<{
  initialTiles: Tile[];
}>();

const emits = defineEmits<{
  (event: 'change-color', tileId: string): void;
  (event: 'change-order', updatedTileList: Tile[]): void;
  (event: 'delete', tileId: string): void;
}>();

const { initialTiles } = toRefs(props);

watch(initialTiles, (updatedTiles: Tile[]) => {
  tiles.value = updatedTiles;
});

const draggedIndex = ref<number | null>(null);
const tiles = ref<Tile[]>(structuredClone(toRaw(initialTiles.value)));

const onDragStart = (index: number) => {
  draggedIndex.value = index;
};

const onDragEnd = () => {
  draggedIndex.value = null;
  emits('change-order', tiles.value);
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
