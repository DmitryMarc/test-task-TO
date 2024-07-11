<script setup lang="ts">
import ContactItem from "@/components/contact-item/ContactItem.vue";
import Checkbox from "@/components/ui/checkbox/Checkbox.vue";
import {IProps} from "./types";
import {ref, watch} from "vue";

const emit = defineEmits<{
  (e: 'select', id: number): void,
  (e: 'edit', id: number): void,
  (e: 'selectItem', id: number): void,
  (e: 'selectAll', checked: boolean): void
}>();

const props = withDefaults(defineProps<IProps>(), {
  contacts: () => [],
  selectedItems: () => new Set([]),
  isAllSelected: false,
  customClass: ''
});

const listRef = ref<HTMLUListElement | null>(null)

const checkHandler = (checked: boolean) => {
  emit('selectAll', checked);
}

const selectHandler = (id: number) => {
  emit('selectItem', id);
}

const editHandler = (id: number) => {
  emit('edit', id);
}

watch(
    () => props.contacts.length,
    (currentValue, prevValue) => {
      if (currentValue > prevValue && listRef.value) {
        listRef.value.scrollTo({top: 0, behavior: 'smooth'});
      }
    }
)

</script>

<template>
  <ul
      v-if="props.contacts.length"
      :class="['list', customClass]"
      ref="listRef"
  >
    <TransitionGroup name="list">
      <li class="list__header" :key="0">
        <h2 class="list__header__title">Контакты</h2>
        <Checkbox
            label="Выделить всё"
            :is-checked="isAllSelected"
            @check="checkHandler"
        />
      </li>
        <ContactItem
            v-for="item in props.contacts"
            :key="item.id"
            :is-selected="selectedItems.has(item.id)"
            :data="item"
            @select="selectHandler"
            @edit="editHandler"
        />
    </TransitionGroup>
  </ul>

  <span v-else>Данных нет</span>
</template>

<style lang="scss" scoped>
@import './style';
</style>