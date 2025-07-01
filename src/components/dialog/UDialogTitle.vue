<script setup lang="ts">
import { className } from "@/utils/className.util";
</script>

<template>
  <h2
    id="dialog-title"
    :class="
      className(
        'text-lg font-semibold leading-none tracking-tight',
        $attrs.class
      )
    "
  >
    <slot />
  </h2>
</template>
