<script setup lang="ts">
import { useListeners } from "vue";
import { className } from "@/utils/className.util";

const listeners = useListeners();
</script>

<template>
  <div
    :class="
      className(
        'rounded-lg border bg-card text-card-foreground shadow-sm',
        $attrs.class
      )
    "
    v-on="listeners"
  >
    <slot />
  </div>
</template>
