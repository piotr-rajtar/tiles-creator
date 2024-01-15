<template>
  <h1 :class="style.header">Tile Creator</h1>

  <div :class="style.buttonContainer">
    <AppButton
      :disabled="Boolean(editedTile)"
      :variant="buttonVariant.success"
      test-id="addTileButton"
      @click="onAddTileClick"
    >
      Add Tile
    </AppButton>
  </div>

  <AppTileList v-if="tiles.length" test-id="tileList" />
  <p v-else :class="style.paragraph" test-id="noTilesInfo">No tiles added...</p>

  <ColorFormModal v-if="editedTile" test-id="colorFormModal" />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import AppButton from './components/AppButton.vue';
import AppTileList from './components/AppTileList.vue';
import ColorFormModal from './components/ColorFormModal.vue';
import { useTileStore } from './stores';
import { buttonVariant } from './typings';

const { addTile } = useTileStore();
const { editedTile, tiles } = storeToRefs(useTileStore());

const onAddTileClick = () => {
  if (editedTile.value) {
    return;
  }

  addTile();
};
</script>

<style lang="scss" module="style">
@use './scss/fonts.scss';
@use './scss/spacings.scss';

* {
  font-family: fonts.$main-font;
}

.header {
  text-align: center;
  margin-bottom: 7 * spacings.$spacing-unit;
}

.buttonContainer {
  display: flex;
  justify-content: center;
  margin-bottom: 7 * spacings.$spacing-unit;
}

.paragraph {
  text-align: center;
  font-size: 1rem;
}
</style>
