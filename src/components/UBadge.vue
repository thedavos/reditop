<script setup lang="ts">
import { computed } from "vue";
import { cva, type VariantProps } from "class-variance-authority";
import { className } from "@/utils/className.util";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type BadgeVariantProps = VariantProps<typeof badgeVariants>;

const props = defineProps<{
  variant?: BadgeVariantProps["variant"];
  classes?: string;
}>();

const badgeClasses = computed(() =>
  className(
    badgeVariants({ variant: props.variant || "default" }),
    props.classes || ""
  )
);
</script>

<template>
  <div :class="badgeClasses">
    <slot />
  </div>
</template>
