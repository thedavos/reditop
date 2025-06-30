<script setup>
import { className } from "@/utils/className.util";
</script>

<template>
  <div :class="className('p-6 pt-0', $attrs.class)">
    <slot />
  </div>
</template>
