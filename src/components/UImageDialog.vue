<script setup lang="ts">
import { ref } from "vue";
import { Download, X } from "lucide-vue";
import {
  UDialog,
  UDialogContent,
  UDialogTrigger,
  UDialogFooter,
} from "@/components/dialog";
import UButton from "@/components/UButton.vue";
import { downloadImage } from "@/utils/downloadImage.util";

const props = defineProps<{
  imageUrl: string;
  imageAlt?: string;
  downloadFilename?: string;
  isBig?: boolean;
}>();

const isDownloading = ref(false);

const onDownloadImage = async () => {
  if (isDownloading.value) return;

  try {
    isDownloading.value = true;
    await downloadImage(props.imageUrl, props.downloadFilename || "imagen.jpg");
  } catch (error) {
    console.error("Error al descargar la imagen:", error);
  } finally {
    isDownloading.value = false;
  }
};
</script>

<template>
  <UDialog>
    <UDialogTrigger>
      <slot />
    </UDialogTrigger>

    <UDialogContent
      :classes="{
        'sm:max-w-[95vh]': isBig,
      }"
      v-slot="{ closeDialog }"
    >
      <div class="flex justify-end" @click="closeDialog">
        <X
          class="h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground transition-colors duration-200"
        />
        <span class="sr-only">Cerrar</span>
      </div>

      <div class="mt-4 flex-col justify-center">
        <img
          :src="imageUrl"
          :alt="imageAlt || 'Imagen'"
          class="w-full max-h-[60vh] object-contain rounded-lg"
        />
        <p class="text-xs text-muted-foreground">{{ imageAlt }}</p>
      </div>

      <UDialogFooter>
        <UButton
          size="sm"
          class="w-full"
          :disabled="isDownloading"
          @click="onDownloadImage"
        >
          <Download class="h-4 w-4 mr-2" />
          {{ isDownloading ? "Descargando..." : "Descargar" }}
        </UButton>
      </UDialogFooter>
    </UDialogContent>
  </UDialog>
</template>
