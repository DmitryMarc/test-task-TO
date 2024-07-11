<script setup lang="ts">
import type {IProps} from "./types";

const emit = defineEmits<{
  (e: 'click', event: Event): void
}>();

const props = withDefaults(defineProps<IProps>(), {
  type: 'button',
});

</script>

<template>
  <button :type="props.type" :class="['btn', customClass]" @click="emit('click', $event)">
    <slot>Кнопка</slot>
  </button>
</template>

<style scoped lang="scss">
@import './styles';
</style>