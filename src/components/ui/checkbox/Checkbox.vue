<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import type {IProps} from "./types";
import Icon from "@/components/ui/icon/Icon.vue";
import { v4 as uuidv4 } from 'uuid';

const emit = defineEmits<{
  (e: 'check', checked: boolean): void
}>();

const props = withDefaults(defineProps<IProps>(), {
  isChecked: false,
  customClass: ''
});

const uuid = uuidv4();

const inputHandler = (e: Event) => {
  emit('check', (e.target as HTMLInputElement).checked)
}
</script>

<template>
    <label :for="uuid" :class="['checkbox', props.customClass]">

      <Button custom-class="checkbox__btn" @click="emit('check', !props.isChecked)">
        <Icon v-show="isChecked" customClass="checkbox__btn__icon" name="check" />
      </Button>

      <span v-if="props.label">{{ label }}</span>
    </label>

    <input
        :id="uuid"
        type="checkbox"
        class="input"
        :checked="props.isChecked"
        @input="inputHandler"
    />
</template>

<style scoped lang="scss">
@import './styles';
</style>