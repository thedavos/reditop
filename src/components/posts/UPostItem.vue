<script setup lang="ts">
import { computed } from "vue";
import type { PostState, RedditPost } from "@/types/reddit";
import { UCard } from "@/components/card";

interface PostItemProps {
  post: RedditPost;
  postState?: PostState;
  isSelected: boolean;
}

const props = defineProps<PostItemProps>();

const isRead = computed(() => !!props.postState?.isRead);
</script>

<template>
  <UCard class="p-4 cursor-pointer transition-all duration-200 hover:shadow-md">
    <!--    <div class="flex gap-4">-->
    <!--      -->
    <!--    </div>-->
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
      </div>
    </div>
  </UCard>
</template>

<style scoped></style>
