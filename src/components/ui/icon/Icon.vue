<script setup lang="ts">
import type {IProps} from './types';
import sprite from '@/assets/icons/sprite.svg';

const props = withDefaults(defineProps<IProps>(), {
  customClass: ''
});
</script>

<template>
  <div :class="['icon', props.customClass]">
    <svg class="icon__svg">
      <use :href="`${sprite}#${props.name}`"/>
    </svg>
  </div>
</template>

<style lang="scss" scoped>
@import './style';
</style>
