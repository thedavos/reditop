<script setup lang="ts">
import { className } from "@/utils/className.util";
</script>

<template>
  <div
    :class="
      className(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
        $attrs.class
      )
    "
  >
    <slot />
  </div>
</template>
