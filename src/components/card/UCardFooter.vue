<script setup lang="ts">
import { className } from "@/utils/className.util";
</script>

<template>
  <div :class="className('flex items-center p-6 pt-0', $attrs.class)">
    <slot />
  </div>
</template>
