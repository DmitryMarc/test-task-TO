<script setup lang="ts">
import Input from "@/components/ui/input/Input.vue";
import Button from "@/components/ui/button/Button.vue";
import type {IProps} from "./types";
import {computed, reactive, watch} from "vue";
import type {ContactWithoutKeyType} from "@/assets/types/types";

const emit = defineEmits<{
  (e: 'submit', data: Record<ContactWithoutKeyType<'id'>, string> & {id?: number}): void
}>();

const props = withDefaults(defineProps<IProps>(), {
  customClass: '',
  resetFlag: false
});

const formData = reactive<Record<ContactWithoutKeyType<'id'>, string>>({
  name: '',
  phone: '',
  email: ''
});

const submitHandler = async () => {
  if (!validate()) {
    return;
  }
  const payload: Record<ContactWithoutKeyType<'id'>, string> & {id?: number} = {
    ...formData
  }
  if (props.data) {
    payload.id = props.data.id;
  }
  emit('submit', payload);
  resetForm();
}

const validate = () => {
  let result = true;
  for (const [key, value] of Object.entries(formData) as [ContactWithoutKeyType<'id'>, string][]) {
    if (!value) {
      errorsMap[key] = 'Это обязательное поле';
      result = false;
    }
  }
  return result;
}

const unsetError = (key: ContactWithoutKeyType<'id'>) => {
  errorsMap[key] = '';
}

const errorsMap: Record<ContactWithoutKeyType<'id'>, string> = reactive({
  name: '',
  phone: '',
  email: ''
})

const resetForm = () => {
  formData.name = '';
  formData.phone = '';
  formData.email = '';

  errorsMap.name = '';
  errorsMap.phone = '';
  errorsMap.email = '';
}

watch(
    () => props.resetFlag,
    (currentValue) => {
      if (currentValue) {
        resetForm();
      }
    }
);

watch(
    () => props.data,
    (currentValue) => {
      if (currentValue) {
        formData.name = currentValue.name;
        formData.phone = currentValue.phone;
        formData.email = currentValue.email;
      } else {
        resetForm();
      }
    }
);

const title = computed(() => props.data?.id ? 'Редактирование' : 'Добавление');
</script>

<template>
  <form @submit.prevent="submitHandler" class="form">
    <legend class="form__title">{{title}}</legend>
    <Input
        label="Имя"
        placeholder="Введите имя..."
        v-model="formData.name"
        :error="errorsMap.name"
        @input="unsetError('name')"
    />
    <Input
        label="Телефон"
        placeholder="Введите телефон..."
        type="tel"
        v-model="formData.phone"
        :error="errorsMap.phone"
        @input="unsetError('phone')"
    />
    <Input
        label="Email"
        placeholder="Введите email..."
        type="email"
        v-model="formData.email"
        :error="errorsMap.email"
        @input="unsetError('email')"
    />
    <Button type="submit" class="form__btn">
      Сохранить
    </Button>
  </form>
</template>

<style scoped lang="scss">
@import './style';
</style>