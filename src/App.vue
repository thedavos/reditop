<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { RefreshCw, Trash2, Menu, X } from "lucide-vue";
import { useRedditStore } from "@/stores/reddit.store";
import UButton from "@/components/UButton.vue";
import UBadge from "@/components/UBadge.vue";
import { useNotifications } from "@/composables/useNotifications.composable";
import UPostItem from "@/components/posts/UPostItem.vue";

const isSidebarOpen = ref(false);
const isDismissingAll = ref(false);

const { showInfo } = useNotifications();
const redditStore = useRedditStore();
const { unreadCount, loading, visiblePosts, posts, postStates } =
  storeToRefs(redditStore);

redditStore.loadPosts();

const onRefresh = () => {
  redditStore.loadPosts();
  showInfo("Actualizando", "Cargando las últimas publicaciones...");
};

const onDismissAll = () => {
  isDismissingAll.value = true;

  setTimeout(() => {
    redditStore.dismissAll();
    isDismissingAll.value = false;
    showInfo(
      "Todas las publicaciones descartadas",
      "Se han eliminado todas las publicaciones de la lista"
    );
  }, 500);
};

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<template>
  <div id="app">
    <div class="min-h-screen bg-background">
      <header
        class="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div class="container flex h-14 items-center justify-between">
          <div class="flex items-center gap-4">
            <UButton
              variant="ghost"
              size="sm"
              class="lg:hidden"
              @click.native="toggleSidebar"
            >
              <X v-if="isSidebarOpen" class="h-4 w-4" />
              <Menu v-else class="h-4 w-4" />
            </UButton>
            <h1 class="text-xl font-bold text-reddit-orange">Reditop</h1>

            <UBadge
              v-if="unreadCount > 0"
              variant="secondary"
              classes="bg-reddit-orange text-white"
              >{{ unreadCount }} nuevas</UBadge
            >
          </div>

          <div class="flex items-center gap-2">
            <UButton
              variant="outline"
              size="sm"
              :disabled="loading"
              @click.native="onRefresh"
            >
              <RefreshCw
                :class="[
                  'h-4 w-4 mr-2',
                  {
                    'animate-spin': loading,
                  },
                ]"
              />
              Actualizar
            </UButton>

            <UButton
              variant="destructive"
              size="sm"
              :disabled="visiblePosts.length === 0 || isDismissingAll"
              @click.native="onDismissAll"
            >
              <Trash2 class="h-4 w-4 mr-2" />
              Descartar todo
            </UButton>
          </div>
        </div>
      </header>

      <div class="container flex">
        <aside
          :class="[
            'fixed inset-y-0 left-0 z-40 w-80 bg-background border-r transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:z-auto',
            {
              'translate-x-0': isSidebarOpen,
              '-translate-x-full': !isSidebarOpen,
            },
          ]"
        >
          <div class="flex flex-col h-full pt-14 lg:pt-4">
            <div class="flex-1 overflow-y-auto p-4 space-y-3">
              <div v-if="loading && posts.length > 0" class="text-center py-8">
                <RefreshCw
                  class="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground"
                />
                <p class="text-muted-foreground">Cargando publicaciones</p>
              </div>
              <div
                v-else-if="visiblePosts.length === 0"
                class="text-center py-8"
              >
                <p class="text-muted-foreground">
                  No hay publicaciones para mostrar
                </p>
              </div>
              <template v-else-if="visiblePosts.length > 0">
                <u-post-item
                  v-for="post in visiblePosts"
                  :key="post.id"
                  :post="post"
                  :post-state="postStates[post.id]"
                  :is-selected="false"
                  :class="{
                    'animate-fade-out': isDismissingAll,
                  }"
                />
              </template>
            </div>
          </div>
        </aside>
      </div>

      <router-view />
      <notifications
        group="info"
        position="bottom right"
        classes="select-none min-h-24 bg-background p-6 pr-8 rounded-md mr-4 mb-4 border text-foreground shadow-lg overflow-hidden flex-column items-center"
        :width="388"
      />
      <notifications
        group="success"
        position="bottom right"
        classes="select-none min-h-24 bg-green-500 p-6 pr-8 rounded-md mr-4 mb-4 border text-foreground shadow-lg overflow-hidden flex-column items-center"
        :width="388"
      />
    </div>
  </div>
</template>
