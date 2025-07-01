import { ref, provide, inject } from "vue";
import { DialogRootKey, type DialogContext } from "@/components/dialog/keys";

export function useDialog() {
  const isOpen = ref(false);

  const openDialog = () => {
    isOpen.value = true;
  };

  const closeDialog = () => {
    isOpen.value = false;
  };

  const toggleDialog = () => {
    isOpen.value = !isOpen.value;
  };

  const dialogContext: DialogContext = {
    isOpen,
    openDialog,
    closeDialog,
  };

  provide(DialogRootKey, dialogContext);

  return {
    isOpen,
    openDialog,
    closeDialog,
    toggleDialog,
  };
}

export function useDialogContext() {
  const context = inject(DialogRootKey, null);

  if (!context) {
    throw new Error(
      "useDialogContext must be used within a dialog provider. " +
        "Make sure to call useDialog() in a parent component."
    );
  }

  return context;
}
