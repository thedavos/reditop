<script setup lang="ts">
import { className } from "@/utils/className.util";
</script>

<template>
  <p
    id="dialog-description"
    :class="className('text-sm text-muted-foreground', $attrs.class)"
  >
    <slot />
  </p>
</template>
