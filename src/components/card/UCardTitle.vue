<script setup>
import { className } from "@/utils/className.util";
</script>

<template>
  <h3
    :class="
      className(
        'text-2xl font-semibold leading-none tracking-tight',
        $attrs.class
      )
    "
  >
    <slot />
  </h3>
</template>
