<script setup lang="ts">
import { onUnmounted, watch, computed, nextTick, ref } from "vue";
import { Portal } from "portal-vue";
import { className } from "@/utils/className.util";
import { useDialogContext, useDialog } from "@/components/dialog/useDialog";

const props = defineProps<{
  classes?: string | object;
}>();

useDialog();
const { isOpen, closeDialog } = useDialogContext();

const isVisible = ref(false);
const isAnimating = ref(false);

const classes = computed(() =>
  className(
    // Mobile: bottom sheet positioning
    "fixed bottom-0 left-0 right-0 z-50 grid w-full gap-4 border bg-background p-6 shadow-lg rounded-t-lg",
    // Desktop: centered dialog
    "sm:left-[50%] sm:top-[50%] sm:bottom-auto sm:right-auto sm:max-w-xl sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-lg",
    // Animation classes
    "transition-all duration-300 ease-out",
    isAnimating.value
      ? "opacity-100 translate-y-0 sm:scale-100"
      : "opacity-0 translate-y-full sm:translate-y-4 sm:scale-95",
    props.classes
  )
);

const backdropClasses = computed(() =>
  className(
    "fixed inset-0 z-50 bg-black/50 transition-opacity duration-300",
    isAnimating.value ? "opacity-100" : "opacity-0"
  )
);

let previousActiveElement: HTMLElement | null = null;

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape" && isOpen.value) {
    closeDialog();
  }
};

const handleBackdropClick = (e: Event) => {
  if (e.target === e.currentTarget) {
    closeDialog();
  }
};

const focusDialog = async () => {
  await nextTick();
  const dialog = document.querySelector('[role="dialog"]') as HTMLElement;
  if (dialog) {
    dialog.focus();
  }
};

const restoreFocus = () => {
  if (previousActiveElement) {
    previousActiveElement.focus();
    previousActiveElement = null;
  }
};

const cleanupDialog = () => {
  document.body.style.overflow = "";
  document.removeEventListener("keydown", handleKeydown);
  restoreFocus();
  isVisible.value = false;
};

watch(isOpen, async (newValue) => {
  if (newValue) {
    previousActiveElement = document.activeElement as HTMLElement;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeydown);

    isVisible.value = true;
    await nextTick();

    setTimeout(() => {
      isAnimating.value = true;
    }, 10);

    await focusDialog();
  } else {
    isAnimating.value = false;

    setTimeout(() => {
      cleanupDialog();
    }, 300);
  }
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
  document.body.style.overflow = "";
  restoreFocus();
});
</script>

<template>
  <Portal to="body">
    <div v-if="isVisible">
      <div :class="backdropClasses" @click="handleBackdropClick" />

      <div
        v-bind="$attrs.class"
        :class="classes"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        tabindex="-1"
      >
        <slot :isOpen="isOpen" :closeDialog="closeDialog" />
      </div>
    </div>
  </Portal>
</template>
