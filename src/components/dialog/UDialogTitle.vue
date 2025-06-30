<script setup lang="ts">
import { className } from "@/utils/className.util";
</script>

<template>
  <div
    :class="
      className(
        'text-lg font-semibold leading-none tracking-tight',
        $attrs.class
      )
    "
  >
    <slot />
  </div>
</template>
