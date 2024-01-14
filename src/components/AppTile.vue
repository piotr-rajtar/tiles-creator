<template>
  <div
    :class="[style.tile, { [style['tile--disabled']]: Boolean(editedTile) }]"
    :style="{ backgroundColor: tile.color }"
    test-id="tile"
  >
    <div :class="style.buttonsContainer">
      <AppButton
        :disabled="Boolean(editedTile)"
        :variant="buttonVariant.primary"
        test-id="changeButton"
        @click="onChangeButtonClick"
      >
        Change
      </AppButton>
      <AppButton
        :disabled="Boolean(editedTile)"
        :variant="buttonVariant.danger"
        test-id="deleteButton"
        @click="onDeleteButtonClick"
      >
        Delete
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useTileStore } from '../stores';
import { buttonVariant } from '../typings';
import type { Tile } from '../typings';

import AppButton from './AppButton.vue';

const props = defineProps<{
  tile: Tile;
}>();

const { deleteTile, setTileToEdit } = useTileStore();
const { editedTile } = storeToRefs(useTileStore());

const onChangeButtonClick = () => {
  if (editedTile.value) {
    return;
  }

  setTileToEdit(props.tile);
};

const onDeleteButtonClick = () => {
  if (editedTile.value) {
    return;
  }

  deleteTile(props.tile.id);
};
</script>

<style lang="scss" module="style">
@use '../scss/spacings.scss';

.tile {
  display: flex;
  align-items: flex-end;
  width: 200px;
  height: 200px;
  padding: spacings.$spacing-unit;
  border-radius: spacings.$spacing-unit;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
}

.tile--disabled {
  pointer-events: none;
}

.buttonsContainer {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
