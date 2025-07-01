<script setup lang="ts">
import { useDialogContext } from "@/components/dialog/useDialog";

const { openDialog } = useDialogContext();

const open = (event: Event) => {
  event.stopPropagation();
  openDialog();
};
</script>

<template>
  <div class="contents" @click="open">
    <slot />
  </div>
</template>
