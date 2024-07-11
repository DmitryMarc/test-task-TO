<script setup lang="ts">
import ContactItem from "@/components/contact-item/ContactItem.vue";
import Checkbox from "@/components/ui/checkbox/Checkbox.vue";
import {IProps} from "./types";

const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'select', id: number): void,
  // eslint-disable-next-line no-unused-vars
  (e: 'edit', id: number): void,
  // eslint-disable-next-line no-unused-vars
  (e: 'selectItem', id: number): void,
  // eslint-disable-next-line no-unused-vars
  (e: 'selectAll', checked: boolean): void,
}>();

const props = withDefaults(defineProps<IProps>(), {
  contacts: () => [],
  selectedItems: () => new Set([]),
  isAllSelected: false,
  customClass: ''
});

const checkHandler = (checked: boolean) => {
  emit('selectAll', checked);
}

const selectHandler = (id: number) => {
  emit('selectItem', id);
}

const editHandler = (id: number) => {
  emit('edit', id);
}

</script>

<template>

  <TransitionGroup
      tag="ul"
      v-if="props.contacts.length"
      :class="['list', customClass]"
      name="list"
  >
      <li class="list__header">
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

    <span v-else>Данных нет</span>
</template>

<style lang="scss" scoped>
@import './style';

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>