<script setup lang="ts">
import { className } from "@/utils/className.util";
</script>

<template>
  <div
    :class="
      className(
        'rounded-lg border bg-card text-card-foreground shadow-sm',
        $attrs.class
      )
    "
  >
    <slot />
  </div>
</template>
