<script setup lang="ts">
import { computed } from "vue";
import { ArrowLeft, ArrowRight } from "lucide-vue";
import { className } from "@/utils/className.util";
import UButton from "@/components/UButton.vue";

const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: "page-change", page: number): void;
}>();

const pageNumbers = computed(() => {
  const pages = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(
    1,
    props.currentPage - Math.floor(maxVisiblePages / 2)
  );
  const endPage = Math.min(props.totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
});

function changePage(page: number) {
  if (page < 1 || page > props.totalPages) return;
  emit("page-change", page);
}
</script>

<template>
  <div>
    <div
      v-if="totalPages > 1"
      :class="
        className(
          'flex items-center justify-center gap-1 sm:gap-2 flex-wrap',
          $attrs.class
        )
      "
    >
      <UButton
        class="flex-shrink-0"
        variant="outline"
        size="sm"
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
      >
        <ArrowLeft class="h-4 w-4 sm:mr-2" />
        <span class="hidden sm:inline">Anterior</span>
      </UButton>

      <div
        class="flex items-center gap-1 overflow-x-auto scrollbar-hide max-w-full"
      >
        <template v-if="pageNumbers[0] > 1">
          <UButton
            class="flex-shrink-0 min-w-[2rem] sm:min-w-[2.5rem]"
            variant="outline"
            size="sm"
            @click="changePage(1)"
          >
            1
          </UButton>
          <span
            v-if="pageNumbers[0] > 2"
            class="px-1 text-sm flex-shrink-0 hidden sm:inline"
            >...</span
          >
          <span
            v-if="pageNumbers[0] > 2"
            class="px-0.5 text-xs flex-shrink-0 sm:hidden"
            >…</span
          >
        </template>

        <UButton
          v-for="page in pageNumbers"
          :key="page"
          :variant="page === currentPage ? 'default' : 'outline'"
          :class="[
            'flex-shrink-0 min-w-[2rem] sm:min-w-[2.5rem]',
            {
              'bg-red-500 hover:bg-red-500/80 text-white': page === currentPage,
            },
          ]"
          size="sm"
          @click="changePage(page)"
        >
          {{ page }}
        </UButton>

        <template v-if="pageNumbers[pageNumbers.length - 1] < totalPages">
          <span
            v-if="pageNumbers[pageNumbers.length - 1] < totalPages - 1"
            class="px-1 text-sm flex-shrink-0 hidden sm:inline"
            >...</span
          >
          <span
            v-if="pageNumbers[pageNumbers.length - 1] < totalPages - 1"
            class="px-0.5 text-xs flex-shrink-0 sm:hidden"
            >…</span
          >

          <UButton
            class="flex-shrink-0 min-w-[2rem] sm:min-w-[2.5rem]"
            variant="outline"
            size="sm"
            @click="changePage(totalPages)"
          >
            {{ totalPages }}
          </UButton>
        </template>
      </div>

      <UButton
        class="flex-shrink-0"
        variant="outline"
        size="sm"
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
      >
        <span class="hidden sm:inline">Siguiente</span>
        <ArrowRight class="h-4 w-4 sm:ml-2" />
      </UButton>
    </div>
    <div class="sm:hidden text-center mt-2 text-sm text-gray-600">
      Página {{ currentPage }} de {{ totalPages }}
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
