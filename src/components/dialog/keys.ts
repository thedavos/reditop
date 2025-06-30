import type { InjectionKey, Ref } from "vue";

export interface DialogContext {
  isOpen: Ref<boolean>;
  openDialog: () => void;
  closeDialog: () => void;
}

export const DialogRootKey: InjectionKey<DialogContext> = Symbol("DialogRoot");
