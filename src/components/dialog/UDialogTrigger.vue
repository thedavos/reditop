<script setup lang="ts">
import { useDialogContext } from "@/components/dialog/useDialog";

const { openDialog } = useDialogContext();
</script>

<template>
  <div class="contents" @click="openDialog">
    <slot />
  </div>
</template>
