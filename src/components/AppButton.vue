<template>
  <button
    :class="[style.button, buttonVariantClass]"
    :disabled="disabled"
    :type="type"
    @click="emits('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue';

import { buttonType, buttonVariant } from '../typings';
import type { ButtonType, ButtonVariant } from '../typings';

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    type?: ButtonType;
    variant: ButtonVariant;
  }>(),
  {
    type: buttonType.button,
  },
);

const emits = defineEmits<{
  (event: 'click'): void;
}>();

const style = useCssModule('style');

const buttonVariantClass = computed<string>(() => {
  const variantClass: Record<ButtonVariant, string> = {
    [buttonVariant.danger]: style['button--danger'],
    [buttonVariant.primary]: style['button--primary'],
    [buttonVariant.success]: style['button--success'],
  };

  return variantClass[props.variant];
});
</script>

<style lang="scss" module="style">
@use '../scss/colors.scss';
@use '../scss/fonts.scss';
@use '../scss/spacings.scss';

$focus-box-shadow: 0 0 0 0.25rem;

.button {
  padding: spacings.$spacing-unit 2 * spacings.$spacing-unit;
  border: 1px solid;
  border-radius: spacings.$spacing-unit;
  font-family: fonts.$button-font;
  font-size: 1rem;
  line-height: 1.5;
  color: colors.$white;
  transition:
    color 0.15s ease-in-out,
    background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  cursor: pointer;

  &:disabled {
    opacity: 0.65;
    pointer-events: none;
  }

  &:focus-visible {
    outline: 0;
  }
}

.button--danger {
  background-color: colors.$button-danger;
  border-color: colors.$button-danger;

  &:active {
    background-color: colors.$button-danger-dark-02;
    border-color: colors.$button-danger-dark-03;
  }

  &:focus-visible {
    background-color: colors.$button-danger-dark-01;
    border-color: colors.$button-danger-dark-02;
    box-shadow: $focus-box-shadow colors.$button-danger-focus-shadow;
  }

  &:hover {
    background-color: colors.$button-danger-dark-01;
    border-color: colors.$button-danger-dark-02;
  }
}

.button--primary {
  background-color: colors.$button-primary;
  border-color: colors.$button-primary;

  &:active {
    background-color: colors.$button-primary-dark-02;
    border-color: colors.$button-primary-dark-03;
  }

  &:focus-visible {
    background-color: colors.$button-primary-dark-01;
    border-color: colors.$button-primary-dark-02;
    box-shadow: $focus-box-shadow colors.$button-primary-focus-shadow;
  }

  &:hover {
    background-color: colors.$button-primary-dark-01;
    border-color: colors.$button-primary-dark-02;
  }
}

.button--success {
  background-color: colors.$button-success;
  border-color: colors.$button-success;

  &:active {
    background-color: colors.$button-success-dark-02;
    border-color: colors.$button-success-dark-03;
  }

  &:focus-visible {
    background-color: colors.$button-success-dark-01;
    border-color: colors.$button-success-dark-02;
    box-shadow: $focus-box-shadow colors.$button-success-focus-shadow;
  }

  &:hover {
    background-color: colors.$button-success-dark-01;
    border-color: colors.$button-success-dark-02;
  }
}
</style>
