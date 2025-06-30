<script setup lang="ts">
import { inject } from "vue";
import { DialogRootKey, type DialogContext } from "@/components/dialog/keys";

const dialogContext = inject(DialogRootKey) as DialogContext;
const { openDialog } = dialogContext;
</script>

<template>
  <div @click="openDialog">
    <slot />
  </div>
</template>
