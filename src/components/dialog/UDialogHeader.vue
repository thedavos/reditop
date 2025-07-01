<script setup lang="ts">
import { className } from "@/utils/className.util";
</script>

<template>
  <div
    :class="
      className(
        'flex flex-col space-y-1.5 text-left lg:text-center',
        $attrs.class
      )
    "
  >
    <slot />
  </div>
</template>
