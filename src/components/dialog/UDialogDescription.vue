<script setup lang="ts">
import { className } from "@/utils/className.util";
</script>

<template>
  <div :class="className('text-sm text-muted-foreground', $attrs.class)">
    <slot />
  </div>
</template>

<style scoped></style>
