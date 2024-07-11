<script setup lang="ts">
import Input from "@/components/ui/input/Input.vue";
import type {IProps} from "./types";

const model = defineModel<string>({required: true});

const props = withDefaults(defineProps<IProps>(), {
  customClass: ''
});

</script>

<template>
  <div :class="['search', props.customClass]">
    <Input placeholder="Поиск..." v-model="model" custom-class="search__btn__input" />
  </div>
</template>

<style scoped lang="scss">
@import './style';
</style>