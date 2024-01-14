<template>
  <div :class="style.modal">
    <h2 :class="style.header">Color Picker Form</h2>
    <div :class="style.closeButton">
      <AppButton :variant="buttonVariant.danger" @click="closeEditMode">X</AppButton>
    </div>

    <form :class="style.form">
      <div :class="style.formField">
        <label for="color-picker" :class="style.formField__label">Pick a color</label>
        <input
          id="color-picker"
          v-model="color"
          :class="style.formField__colorInput"
          type="color"
        />
      </div>
      <div :class="style.formField">
        <label for="color-hex" :class="style.formField__label">HEX</label>
        <input
          id="color-hex"
          v-model="color"
          :class="[
            style.formField__hexInput,
            { [style['formField__hexInput--invalid']]: isHexColorInvalid },
          ]"
          @blur="onHexColorFieldBlur"
        />
        <p v-if="isHexColorInvalid" :class="style.formField__hexInputErrorMessage">
          {{ hexColorErrorMessage }}
        </p>
      </div>
      <AppButton :variant="buttonVariant.primary" @click="onChangeClick">Change</AppButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { useTileStore } from '../stores';
import { buttonVariant, type Tile } from '../typings';
import { checkHexValidity } from '../utils';

import AppButton from './AppButton.vue';

const { editedTile, closeEditMode, updateTile } = useTileStore();

const color = ref<string>(editedTile!.color);
const isHexColorFieldTouched = ref(false);

const isHexColorInvalid = computed<boolean>(
  () => !checkHexValidity(color.value) && isHexColorFieldTouched.value,
);

const hexColorErrorMessage = computed<string>(() => {
  if (!color.value.length) {
    return 'Hex color should not be empty';
  }

  if (color.value.length !== 7) {
    return 'Hex color should be 7 characters long';
  }

  if (color.value[0] !== '#') {
    return 'Hex color should start with #';
  }

  return 'Invalid hex color format';
});

const onHexColorFieldBlur = (): void => {
  isHexColorFieldTouched.value = true;
};

const onChangeClick = (): void => {
  if (isHexColorInvalid.value) {
    return;
  }

  const updatedTile: Tile = {
    ...editedTile!,
    color: color.value,
  };

  updateTile(updatedTile);
  closeEditMode();
};
</script>

<style lang="scss" module="style">
@use '../scss/colors.scss';
@use '../scss/mixins.scss';
@use '../scss/spacings.scss';

$form-font-size: 20px;

.modal {
  width: 50%;
  max-width: 500px;
  height: 40%;
  padding: 4 * spacings.$spacing-unit;
  border-radius: 6 * spacings.$spacing-unit;
  outline: 8px ridge rgba(colors.$form-modal-outline, 0.6);

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: colors.$black;
  color: colors.$white;

  @include mixins.tablet-screen {
    width: 80%;
  }

  @include mixins.mobile-screen {
    width: 100%;
    height: 100%;
    outline: none;
    border-radius: 0;
  }
}

.header {
  text-align: center;
  margin-bottom: 5 * spacings.$spacing-unit;
}

.closeButton {
  position: absolute;
  top: 4 * spacings.$spacing-unit;
  right: 4 * spacings.$spacing-unit;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8 * spacings.$spacing-unit;
}

.formField {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: spacings.$spacing-unit;
}

.formField__label {
  font-size: $form-font-size;
}

.formField__colorInput {
  width: 100px;
  height: 100px;
  border: none;
  cursor: pointer;
  background-color: transparent;
}

.formField__hexInput {
  line-height: 1.5;
  font-size: $form-font-size;
  background-color: transparent;
  border: 1px solid colors.$gray;
  border-radius: spacings.$spacing-unit;
  color: colors.$white;
}

.formField__hexInput--invalid {
  border-color: colors.$form-modal-error;
  box-shadow: 1px 1px 10px colors.$form-modal-error;
}

.formField__hexInputErrorMessage {
  color: colors.$form-modal-error;
}
</style>
