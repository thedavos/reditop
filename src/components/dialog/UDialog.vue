<script setup lang="ts">
import { provide, ref } from "vue";
import { DialogRootKey } from "@/components/dialog/keys";

const isOpen = ref(false);

const openDialog = () => {
  isOpen.value = true;
};

const closeDialog = () => {
  isOpen.value = false;
};

provide(DialogRootKey, {
  isOpen,
  openDialog,
  closeDialog,
});
</script>

<template>
  <div class="dialog-root">
    <slot />
  </div>
</template>
