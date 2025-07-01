<script setup lang="ts">
import { className } from "@/utils/className.util";
</script>

<template>
  <p :class="className('text-sm text-muted-foreground', $attrs.class)">
    <slot />
  </p>
</template>
