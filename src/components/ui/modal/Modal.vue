<script setup lang="ts">
import type {ModalProps} from './types';
import {ref, watch} from "vue";
import Icon from "@/components/ui/icon/Icon.vue";
import Button from "@/components/ui/button/Button.vue";

const emit = defineEmits<{
  (e: 'close'): void
}>();
const props = withDefaults(defineProps<ModalProps>(), {
	isShown: false,
  hasCloseBtn: false,
	customClass: ''
});

const modalRef = ref<HTMLDialogElement | null>(null);

const closeHandler = () => {
	if (modalRef.value) {
		emit('close');
		modalRef.value.close();
	}
};

watch(
	() => props.isShown,
	(currentValue) => {
		if (currentValue && modalRef.value) {
      modalRef.value.showModal();
		} else {
      closeHandler();
    }
	}
);
</script>

<template>
	<dialog
      ref="modalRef"
      class="modal"
      :class="props.customClass"
      @click.self="closeHandler"
  >
    <Button
        v-if="props.hasCloseBtn"
        custom-class="modal__btn"
        @click="emit('close')"
    >
      <Icon name="close"/>
    </Button>
		<slot> Модальное окно </slot>
	</dialog>
</template>

<style lang="scss" scoped>
@import './style';
</style>
