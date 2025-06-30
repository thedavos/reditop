<script setup lang="ts">
import { inject, onUnmounted, watch, computed } from "vue";
import { X } from "lucide-vue";
import { Portal } from "portal-vue";
import { className } from "@/utils/className.util";
import UDialogClose from "@/components/dialog/UDialogClose.vue";
import { type DialogContext, DialogRootKey } from "@/components/dialog/keys";

const props = defineProps<{
  classes?: string;
}>();

const dialogContext = inject(DialogRootKey) as DialogContext;
const { isOpen, closeDialog } = dialogContext;

const classes = computed(() =>
  className(
    "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg sm:rounded-lg",
    props.classes
  )
);

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape" && isOpen.value) {
    closeDialog();
  }
};

watch(isOpen, (newValue) => {
  if (newValue) {
    document.addEventListener("keydown", handleKeydown);
    document.body.style.overflow = "hidden";
  } else {
    document.removeEventListener("keydown", handleKeydown);
    document.body.style.overflow = "";
  }
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
  document.body.style.overflow = "";
});
</script>

<template>
  <Portal to="body">
    <Transition
      enter-from-class="opacity-0"
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 bg-black/50"
        @click="closeDialog"
      />
    </Transition>

    <Transition
      enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      enter-active-class="transition-all duration-300 ease-out"
      enter-to-class="opacity-100 translate-y-0 sm:scale-100"
      leave-from-class="opacity-100 translate-y-0 sm:scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    >
      <div
        v-if="isOpen"
        v-bind="$attrs"
        :class="classes"
        role="dialog"
        aria-modal="true"
      >
        <slot />

        <UDialogClose
          class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X class="h-4 w-4" />
          <span class="sr-only">Close</span>
        </UDialogClose>
      </div>
    </Transition>
  </Portal>
</template>
