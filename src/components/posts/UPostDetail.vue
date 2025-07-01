<script setup lang="ts">
import { computed, ref } from "vue";
import {
  ArrowUp,
  MessageSquare,
  User,
  Clock,
  Download,
  ExternalLink,
  Loader2,
  Trash2,
} from "lucide-vue";
import {
  UCard,
  UCardTitle,
  UCardHeader,
  UCardContent,
} from "@/components/card";
import UBadge from "@/components/UBadge.vue";
import UButton from "@/components/UButton.vue";
import UImageDialog from "@/components/UImageDialog.vue";
import { formatRelativeTime } from "@/utils/date.util";
import { formatNumber } from "@/utils/formatNumber.util";
import { getImageUrl } from "@/utils/imageUrl.util";
import { downloadImage } from "@/utils/downloadImage.util";
import { useNotifications } from "@/composables/useNotifications.composable";
import type { RedditPost } from "@/types/reddit";

const props = defineProps<{ post: RedditPost }>();
const emit = defineEmits(["dismiss"]);

const isDownloading = ref(false);

const { showInfo } = useNotifications();

const fullImageUrl = computed(() => getImageUrl(props.post));

const downloadFilename = computed(
  () =>
    `reddit-${props.post.id}-${props.post.title
      .substring(0, 50)
      .replace(/[^\w\s]/gi, "")}.jpg`
);

const onDownloadImage = async () => {
  if (!fullImageUrl.value) return;

  isDownloading.value = true;

  try {
    await downloadImage(fullImageUrl.value, downloadFilename.value);

    showInfo("Imagen descargada", "La imagen se ha guardado en tu dispositivo");
  } catch (error) {
    console.error("Error al descargar la imagen", error);
    showInfo("Error al descargar la imagen", "No se pudo descargar la imagen");
  } finally {
    isDownloading.value = false;
  }
};

const openInReddit = () => {
  window.open(`https://reddit.com${props.post.permalink}`, "_blank");
};
</script>

<template>
  <UCard class="h-full flex flex-col relative">
    <UCardHeader class="pb-4">
      <div class="flex items-start justify-between gap-4">
        <UCardTitle class="text-lg leading-tight">
          {{ post.title }}
        </UCardTitle>
        <UButton
          variant="outline"
          size="sm"
          @click="openInReddit"
          class="flex-shrink-0"
        >
          <ExternalLink class="h-4 w-4" />
          <span class="hidden md:block ml-2">Ver en Reddit</span>
        </UButton>
      </div>

      <div
        class="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground mt-2"
      >
        <div class="flex items-center gap-1">
          <User class="h-4 w-4" />
          <span>u/{{ post.author }}</span>
        </div>
        <div class="flex items-center gap-1">
          <Clock class="h-4 w-4" />
          <span>{{ formatRelativeTime(post.created_utc) }}</span>
        </div>
        <UBadge variant="secondary"> r/{{ post.subreddit }} </UBadge>
      </div>

      <div class="flex items-center gap-6 text-sm mt-3">
        <div class="flex items-center gap-1">
          <ArrowUp class="h-4 w-4 text-orange-500" />
          <span class="font-medium">{{ formatNumber(post.score) }} votos</span>
        </div>
        <div class="flex items-center gap-1">
          <MessageSquare class="h-4 w-4" />
          <span class="font-medium"
            >{{ formatNumber(post.num_comments) }} comentarios</span
          >
        </div>
      </div>
    </UCardHeader>

    <UCardContent class="flex-grow">
      <div v-if="fullImageUrl" class="mb-6">
        <UImageDialog
          is-big
          :image-url="fullImageUrl"
          :image-alt="post.title"
          :download-filename="downloadFilename"
        >
          <img
            :src="fullImageUrl"
            :alt="post.title"
            class="w-full max-h-96 object-contain cursor-pointer rounded border bg-muted hover:opacity-90 transition-opacity"
          />
        </UImageDialog>
      </div>

      <div v-if="post.selftext" class="mb-6">
        <h4 class="font-medium mb-2">Contenido</h4>
        <div
          class="text-sm text-muted-foreground whitespace-pre-wrap border-l-4 border-muted pl-4"
        >
          {{ post.selftext }}
        </div>
      </div>

      <div
        v-if="
          post.url && post.url !== `https://www.reddit.com${post.permalink}`
        "
        class="mb-4"
      >
        <h4 class="font-medium mb-2">Enlace externo</h4>
        <a
          :href="post.url"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm text-blue-500 hover:underline break-all"
        >
          {{ post.url }}
        </a>
      </div>

      <div class="space-y-2 text-xs text-muted-foreground border-t pt-4 mt-4">
        <div>ID del post: {{ post.id }}</div>
        <div v-if="post.post_hint">Tipo de contenido: {{ post.post_hint }}</div>
        <div v-if="post.is_video" class="text-orange-500 font-semibold">
          📹 Contenido de video
        </div>
      </div>

      <div class="block md:flex gap-2 w-full mt-4">
        <UButton
          :disabled="isDownloading"
          size="sm"
          variant="default"
          class="w-full"
          @click="onDownloadImage"
        >
          <Loader2 v-if="isDownloading" class="h-4 w-4 mr-2 animate-spin" />
          <Download v-else class="h-4 w-4 mr-2" />
          {{ isDownloading ? "Descargando..." : "Descargar" }}
        </UButton>
        <UButton
          size="sm"
          variant="ghost"
          class="w-full"
          @click="emit('dismiss', post.id)"
        >
          <Trash2 class="h-4 w-4 mr-2 text-muted-foreground" />
          <span class="text-muted-foreground">Descartar</span>
        </UButton>
      </div>
    </UCardContent>
  </UCard>
</template>
