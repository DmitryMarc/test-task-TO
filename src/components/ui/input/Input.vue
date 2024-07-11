<script setup lang="ts">
import type {IProps} from "./types";
import {v4 as uuidv4} from "uuid";

// eslint-disable-next-line no-undef
const model = defineModel<string>({required: true});

const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'input', value: string): void
}>();

const props = withDefaults(defineProps<IProps>(), {
  type: 'text',
  placeholder: '',
  value: '',
  customClass: '',
  error: ''
});

const uuid = uuidv4();
</script>

<template>
  <div :class="['container', customClass]">
    <label v-if="props.label" :for="uuid" class="label">
      {{props.label}}
    </label>
    <input
        :id="uuid"
        :type="props.type"
        :placeholder="props.placeholder"
        class="input"
        v-model.trim="model"
        @input="emit('input', $event.target.value)"
    />
    <small v-if="props.error" class="error">
      {{ props.error }}
    </small>
  </div>

</template>

<style scoped lang="scss">
@import './styles';
</style>