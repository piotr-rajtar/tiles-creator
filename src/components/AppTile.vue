<template>
  <div :class="style.tile" :style="{ backgroundColor: color, borderColor: color }" test-id="tile">
    <div :class="style.buttonsContainer">
      <AppButton
        test-id="changeButton"
        :variant="buttonVariant.primary"
        @click="emits('change-color')"
      >
        Change
      </AppButton>
      <AppButton test-id="deleteButton" :variant="buttonVariant.danger" @click="emits('delete')">
        Delete
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { buttonVariant } from '../typings';

import AppButton from './AppButton.vue';

defineProps<{
  color: string;
}>();

const emits = defineEmits<{
  (event: 'change-color'): void;
  (event: 'delete'): void;
}>();
</script>

<style lang="scss" module="style">
.tile {
  display: flex;
  align-items: flex-end;
  width: 200px;
  height: 200px;
  padding: 0.375rem;
  border-radius: 0.375rem;
  border: 1px solid;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
}

.buttonsContainer {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
