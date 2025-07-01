<script setup lang="ts">
import { useDialogContext } from "@/components/dialog/useDialog";

const { closeDialog } = useDialogContext();

const close = () => {
  console.log("Closing Dialog");
  closeDialog();
};
</script>

<template>
  <div class="contents" @click="close()">
    <slot />
  </div>
</template>
