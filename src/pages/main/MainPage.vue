<script setup lang="ts">
import ContactList from "@/components/contact-list/ContactList.vue";
import {computed, onMounted, ref, watch} from "vue";
import Button from "@/components/ui/button/Button.vue";
import ContactForm from "@/components/contact-form/ContactForm.vue";
import Modal from "@/components/ui/modal/Modal.vue";
import type {ContactType} from "@/assets/types/types";
import SearchBar from "@/components/search-bar/SearchBar.vue";
import {LocalStorageHelper} from "@/utils/localStorageHelper";
import {Api} from "@/api/api";

const contacts = ref<ContactType[]>([]);
const isModalShown = ref(false);
const isAllSelected = ref(false);
const editableData = ref<ContactType | null>(null);
const selectedItems = ref<Set<number>>(new Set([]));
const mode = ref<'add' | 'edit'>('add');
const searchValue = ref('');
const isLoading = ref(false);
const resetFlag = ref(false);

onMounted(async () => {
  let contactsValue = LocalStorageHelper.getData('contacts');

  if (!contactsValue) {
    isLoading.value = true;
    contactsValue = await Api.getContacts();
    isLoading.value = false;
  }

  if (contactsValue) {
    contacts.value = contactsValue;
    LocalStorageHelper.setData('contacts', contactsValue)
  }
})

const selectHandler = (id: number) => {
  const found = selectedItems.value.has(id);
  if (found) {
    selectedItems.value.delete(id);
  } else {
    selectedItems.value.add(id);
  }
}

const openModal = () => {
  isModalShown.value = true;
  resetFlag.value = false;
}

const editHandler = (id: number) => {
  openModal()
  mode.value = 'edit';
  const foundItem = contacts.value.find(item => item.id === id);
  if (foundItem) {
    editableData.value = foundItem;
  }
}

const deleteHandler = () => {
  contacts.value = contacts.value.filter(item => !selectedItems.value.has(item.id));
  selectedItems.value.clear();

  if (contacts.value.length) {
    LocalStorageHelper.setData('contacts', contacts.value);
  } else {
    LocalStorageHelper.deleteDataByKey('contacts');
  }
}

const selectAllHandler = (checked: boolean) => {
  isAllSelected.value = checked;

  if (checked) {
    contacts.value.forEach(item => {
      selectedItems.value.add(item.id);
    });
  } else {
    contacts.value.forEach(item => {
      selectedItems.value.delete(item.id);
    });
  }
}

const submitHandler = (data: ContactType | Omit<ContactType, 'id'>) => {
  switch (mode.value) {
    case 'add':
      addItemToList(data);
      break;
    case 'edit':
      editListItem(data as ContactType);
      break;
  }
}

const addItemToList = (data: Omit<ContactType, 'id'>) => {
  const id = (contacts.value[0]?.id + 1) || 1;
  const newItem = {id, ...data};
  contacts.value.unshift(newItem);
  LocalStorageHelper.pushDataToList('contacts', newItem);
  closeHandler();
}

const editListItem = (data: ContactType) => {
  const foundIndex = contacts.value.findIndex(item => item.id === data.id);
  if (foundIndex >= 0) {
    contacts.value[foundIndex] = data;
  }
  LocalStorageHelper.setData('contacts', contacts.value);
  closeHandler();
}

const closeHandler = () => {
  isModalShown.value = false;
  resetFlag.value = true;

  if (editableData.value) {
    editableData.value = null;
  }
  if (mode.value === 'edit') {
    mode.value = 'add';
  }
}

watch(
    () => [contacts.value.length, selectedItems.value.size],
    ([contactsLength, selectedItemsLength]) => {
      isAllSelected.value = contactsLength === selectedItemsLength;
    }
);

const list = computed(() => {
  if (searchValue.value) {
    return contacts.value.filter(item => item.name.toLowerCase().startsWith(searchValue.value.toLowerCase()));
  }
  return contacts.value;
})
</script>

<template>
  <div class="page">
    <SearchBar
        v-model="searchValue"
        custom-class="page__search"
    />
    <div class="page__btns">
      <Button
          custom-сlass="page__btns__item"
          @click="openModal"
      >
        Добавить
      </Button>
      <Button
          v-if="selectedItems.size"
          custom-сlass="page__btns__item"
          @click="deleteHandler"
      >
        Удалить выбранное
      </Button>
    </div>

      <ContactList
          :contacts="list"
          :selected-items="selectedItems"
          :is-all-selected="isAllSelected"
          @select="selectHandler"
          @edit="editHandler"
          @select-item="selectHandler"
          @select-all="selectAllHandler"
          custom-class="page__list"
      />
      <span v-if="isLoading">
        Загрузка ...
      </span>
  </div>

  <Modal
      :is-shown="isModalShown"
      :has-close-btn="true"
      @close="closeHandler"
  >
    <ContactForm
        :data="editableData"
        @submit="submitHandler"
        :reset-flag="resetFlag"
    />
  </Modal>
</template>

<style lang="scss" scoped>
@import './style';
</style>