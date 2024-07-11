<script setup lang="ts">
import {IProps} from "./types";
import Button from "@/components/ui/button/Button.vue";
import Icon from "@/components/ui/icon/Icon.vue";

const emit = defineEmits<{
  (e: 'select', id: number): void,
  (e: 'edit', id: number): void
}>();

const props = defineProps<IProps>();

</script>

<template>
  <li @click="emit('select', props.data.id)" :class="['info', {selected: props.isSelected}]">
    <template v-for="(value, key) in props.data">
      <span v-if="key !== 'id'" :key="key" class="info__item">
        <span class="info__item__text" :title="value ? `${value}` : ''">
          {{value}}
        </span>
      </span>
    </template>
    <span class="info__item">
      <Button @click.stop="emit('edit', props.data.id)" custom-class="info__item__btn">
        <Icon name="edit"  />
      </Button>
    </span>
  </li>
</template>

<style scoped lang="scss">
@import './style';
</style>