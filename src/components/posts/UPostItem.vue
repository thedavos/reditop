<script setup lang="ts">
import { computed, ref } from "vue";
import { X, User, Clock, ArrowUp, MessageSquare, ImageOff } from "lucide-vue";
import { UCard } from "@/components/card";
import UButton from "@/components/UButton.vue";
import { formatRelativeTime } from "@/utils/date.util";
import { formatNumber } from "@/utils/formatNumber.util";
import { getThumbnailUrl } from "@/utils/thumbnail.util";
import type { PostState, RedditPost } from "@/types/reddit";
import UBadge from "@/components/UBadge.vue";

interface PostItemProps {
  post: RedditPost;
  postState?: PostState;
  isSelected: boolean;
}

const props = defineProps<PostItemProps>();
const emit = defineEmits(["select", "dismiss"]);

const isImageBroken = ref(false);

const isRead = computed(() => !!props.postState?.isRead);
const thumbnail = computed(() => getThumbnailUrl(props.post));

const onThumbnailError = () => {
  isImageBroken.value = true;
};

const onDismiss = (e: Event) => {
  e.stopPropagation();
  emit("dismiss", props.post.id);
};
</script>

<template>
  <UCard
    :class="[
      'p-4 cursor-pointer transition-all duration-200 hover:shadow-md',
      {
        'ring-2 ring-reddit-orange border-reddit-orange': isSelected,
        'opacity-70': isRead,
      },
    ]"
    @click="emit('select', post.id)"
  >
    <div class="flex gap-4">
      <div class="flex-shrink-0">
        <img
          v-if="thumbnail && !isImageBroken"
          :src="thumbnail"
          alt="Thumbnail"
          class="w-16 h-16 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
          @error="onThumbnailError"
        />
        <ImageOff v-else class="h-16 w-16 text-muted-foreground" />
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between gap-2 mb-2">
          <h3
            :class="[
              'text-sm font-medium line-clamp-2',
              {
                'text-muted-foreground': isRead,
                'text-foreground': !isRead,
              },
            ]"
          >
            {{ post.title }}
          </h3>

          <UButton
            variant="ghost"
            size="sm"
            class="flex-shrink-0 h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
            @click="onDismiss"
          >
            <X class="h-3 w-3" />
          </UButton>
        </div>

        <div
          class="flex-col items-center gap-2 text-xs text-muted-foreground mb-2"
        >
          <div class="flex items-center gap-1 mb-1">
            <User class="h-3 w-3" />
            <span>u/{{ post.author }}</span>
          </div>

          <div class="flex items-center gap-1 mb-1">
            <Clock class="h-3 w-3" />
            <span>{{ formatRelativeTime(post.created_utc) }}</span>
          </div>

          <UBadge variant="secondary" class="text-xs">
            r/{{ post.subreddit }}
          </UBadge>
        </div>

        <div class="flex items-center gap-4 text-xs">
          <div class="flex items-center gap-1">
            <ArrowUp class="h-3 w-3 text-reddit-upvote" />
            <span>{{ formatNumber(post.score) }}</span>
          </div>

          <div class="flex items-center gap-1">
            <MessageSquare class="h-3 w-3" />
            <span>{{ formatNumber(post.num_comments) }}</span>
          </div>

          <UBadge
            v-if="!isRead"
            variant="default"
            class="bg-reddit-orange hover:bg-reddit-orange/80"
          >
            Nuevo
          </UBadge>
        </div>
      </div>
    </div>
  </UCard>
</template>

<style scoped></style>
