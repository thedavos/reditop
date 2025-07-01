<script setup lang="ts">
import { useDialog } from "@/components/dialog/useDialog";

useDialog();
</script>

<template>
  <div class="dialog-root">
    <slot />
  </div>
</template>
