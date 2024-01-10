<template>
  <button :class="[style.button, buttonVariantClass]" @click="emits('click')">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue';

import { ButtonVariant } from '../typings';

const props = defineProps<{
  variant: ButtonVariant;
}>();

const emits = defineEmits<{
  (event: 'click'): void;
}>();

const style = useCssModule('style');

const buttonVariantClass = computed(() => {
  const variantClass = {
    [ButtonVariant.DANGER]: style['button--danger'],
    [ButtonVariant.PRIMARY]: style['button--primary'],
    [ButtonVariant.SUCCESS]: style['button--success'],
  };

  return variantClass[props.variant];
});
</script>

<style lang="scss" module="style">
@use '../scss/colors.scss';

$focus-box-shadow: 0 0 0 0.25rem;

.button {
  padding: 0.375rem 0.75rem;
  border: 1px solid;
  border-radius: 0.375rem;
  font-size: 1rem;
  line-height: 1.5;
  color: colors.$white;
  transition:
    color 0.15s ease-in-out,
    background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  cursor: pointer;

  &:focus-visible {
    outline: 0;
  }
}

.button--danger {
  background-color: colors.$button-danger;
  border-color: colors.$button-danger;

  &:hover {
    background-color: colors.$button-danger-dark-01;
    border-color: colors.$button-danger-dark-02;
  }

  &:active {
    background-color: colors.$button-danger-dark-02;
    border-color: colors.$button-danger-dark-03;
  }

  &:focus-visible {
    background-color: colors.$button-danger-dark-01;
    border-color: colors.$button-danger-dark-02;
    box-shadow: $focus-box-shadow colors.$button-danger-focus-shadow;
  }
}

.button--primary {
  background-color: colors.$button-primary;
  border-color: colors.$button-primary;

  &:hover {
    background-color: colors.$button-primary-dark-01;
    border-color: colors.$button-primary-dark-02;
  }

  &:active {
    background-color: colors.$button-primary-dark-02;
    border-color: colors.$button-primary-dark-03;
  }

  &:focus-visible {
    background-color: colors.$button-primary-dark-01;
    border-color: colors.$button-primary-dark-02;
    box-shadow: $focus-box-shadow colors.$button-primary-focus-shadow;
  }
}

.button--success {
  background-color: colors.$button-success;
  border-color: colors.$button-success;

  &:hover {
    background-color: colors.$button-success-dark-01;
    border-color: colors.$button-success-dark-02;
  }

  &:active {
    background-color: colors.$button-success-dark-02;
    border-color: colors.$button-success-dark-03;
  }

  &:focus-visible {
    background-color: colors.$button-success-dark-01;
    border-color: colors.$button-success-dark-02;
    box-shadow: $focus-box-shadow colors.$button-success-focus-shadow;
  }
}
</style>
