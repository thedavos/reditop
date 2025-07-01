import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import type { PostState, RedditPost, RedditStoreState } from "@/types/reddit";
import { RedditService } from "@/services/reddit.api";

const STORAGE_KEY = "reddit-client-state";
const POSTS_PER_PAGE = 10;

const defaultStoredState = {
  posts: [] as RedditPost[],
  postStates: {} as Record<string, PostState>,
  selectedPost: null as RedditPost | null,
  after: null as string | null,
};

const storedState = useLocalStorage(STORAGE_KEY, defaultStoredState);

export const useRedditStore = defineStore("reddit", {
  state: (): RedditStoreState => {
    const hasStoredData = storedState.value.posts.length > 0;

    return {
      posts: hasStoredData ? storedState.value.posts : [],
      postStates: hasStoredData ? storedState.value.postStates : {},
      selectedPost: hasStoredData ? storedState.value.selectedPost : null,
      currentPage: 1,
      after: hasStoredData ? storedState.value.after : null,
      error: null,
      loading: false,
      isInitialized: hasStoredData,
    };
  },

  getters: {
    visiblePosts(): RedditPost[] {
      return this.posts.filter((post) => {
        return !this.getPostState(post.id).isDismissed;
      });
    },

    unreadCount(): number {
      return this.visiblePosts.filter((post) => {
        return !this.getPostState(post.id).isRead;
      }).length;
    },

    getPostState:
      (state) =>
      (postId: string): PostState => {
        return (
          state.postStates[postId] || {
            isRead: false,
            isDismissed: false,
            isDismissing: false,
          }
        );
      },

    paginatedPosts(): RedditPost[] {
      const startIndex = (this.currentPage - 1) * POSTS_PER_PAGE;
      const endIndex = startIndex + POSTS_PER_PAGE;

      return this.visiblePosts.slice(startIndex, endIndex);
    },

    totalPages(): number {
      return Math.ceil(this.visiblePosts.length / POSTS_PER_PAGE);
    },

    isPostDismissed:
      (state) =>
      (postId: string): boolean => {
        return !!state.postStates[postId]?.isDismissed;
      },

    isPostDismissing:
      (state) =>
      (postId: string): boolean => {
        return !!state.postStates[postId]?.isDismissing;
      },
  },

  actions: {
    syncWithStorage() {
      storedState.value = {
        posts: this.posts,
        postStates: this.postStates,
        selectedPost: this.selectedPost,
        after: this.after,
      };
    },

    loadFromStorage() {
      if (storedState.value.posts.length > 0) {
        this.$patch({
          posts: storedState.value.posts,
          postStates: storedState.value.postStates,
          selectedPost: storedState.value.selectedPost,
          after: storedState.value.after,
          isInitialized: true,
        });
      }
    },

    async initialize() {
      if (!this.isInitialized) {
        this.loadFromStorage();

        // Si no hay datos en localStorage, cargar desde API
        if (!this.isInitialized) {
          await this.loadPosts();
        }
      }
    },

    setPosts(posts: RedditPost[]) {
      this.posts = posts;
      this.syncWithStorage();
    },

    addPosts(posts: RedditPost[]) {
      this.posts = [...this.posts, ...posts];
      this.syncWithStorage();
    },

    setPostState(postId: string, stateUpdate: Partial<PostState>) {
      const updatedPostStates = { ...this.postStates };

      if (!updatedPostStates[postId]) {
        updatedPostStates[postId] = {
          isRead: false,
          isDismissed: false,
          isDismissing: false,
        };
      }

      updatedPostStates[postId] = {
        ...updatedPostStates[postId],
        ...stateUpdate,
      };

      this.postStates = updatedPostStates;
      this.syncWithStorage();
    },

    setSelectedPost(post: RedditPost | null) {
      this.selectedPost = post;
      this.syncWithStorage();
    },

    setAfter(after: string | null) {
      this.after = after;
      this.syncWithStorage();
    },

    setLoading(loading: boolean) {
      this.loading = loading;
    },

    setError(error: string | null) {
      this.error = error;
    },

    setCurrentPage(page: number) {
      this.currentPage = page;
    },

    initializePostStates(posts: RedditPost[]) {
      posts.forEach((post) => {
        if (!this.postStates[post.id]) {
          this.postStates[post.id] = {
            isRead: false,
            isDismissed: false,
            isDismissing: false,
          };
        }
      });
      this.syncWithStorage();
    },

    dismissAllPosts(posts: RedditPost[]) {
      const updatedPostStates = { ...this.postStates };

      posts.forEach((post) => {
        if (!updatedPostStates[post.id]) {
          updatedPostStates[post.id] = {
            isRead: false,
            isDismissed: false,
            isDismissing: false,
          };
        }

        updatedPostStates[post.id] = {
          ...updatedPostStates[post.id],
          isDismissed: true,
        };
      });

      this.postStates = updatedPostStates;
      this.selectedPost = null;
      this.syncWithStorage();
    },

    async loadPosts({ loadMore = false } = {}) {
      if (this.loading) return;

      this.setLoading(true);
      this.setError(null);

      try {
        const response = await RedditService.getTopPosts(
          50,
          loadMore ? this.after : null
        );
        const posts = response.data.children.map((child) => child.data);

        if (loadMore) {
          this.addPosts(posts);
        } else {
          this.setPosts(posts);
        }

        this.setAfter(response.data.after);
        this.initializePostStates(posts);
        this.isInitialized = true;
      } catch (error) {
        this.setError("Failed to load posts. Please try again.");
        console.error("Error loading posts:", error);
      } finally {
        this.setLoading(false);
      }
    },

    markAsRead(postId: string) {
      this.setPostState(postId, { isRead: true });
    },

    markAsDismissing(postId: string) {
      this.setPostState(postId, { isDismissing: true });
    },

    dismissPost(postId: string) {
      this.setPostState(postId, { isDismissed: true });

      if (this.selectedPost?.id === postId) {
        this.setSelectedPost(null);
      }
    },

    dismissAll() {
      this.dismissAllPosts(this.visiblePosts);
    },

    selectPost(post: RedditPost) {
      this.setSelectedPost(post);
      this.markAsRead(post.id);
    },

    resetStore() {
      this.posts = [];
      this.postStates = {};
      this.selectedPost = null;
      this.currentPage = 1;
      this.after = null;
      this.error = null;
      this.loading = false;
      this.syncWithStorage();
    },

    async resetAndReload() {
      this.resetStore();
      await this.loadPosts();
    },
  },
});
