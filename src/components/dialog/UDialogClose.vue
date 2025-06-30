<script setup lang="ts">
import { inject } from "vue";
import { DialogRootKey, type DialogContext } from "@/components/dialog/keys";

const dialogContext = inject(DialogRootKey) as DialogContext;
const { closeDialog } = dialogContext;
</script>

<template>
  <div @click="closeDialog">
    <slot />
  </div>
</template>
