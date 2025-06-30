import { defineStore } from "pinia";
import type { PostState, RedditPost, RedditStoreState } from "@/types/reddit";
import { RedditService } from "@/services/reddit.api";

const STORAGE_KEY = "reddit-client-state";

export const useRedditStore = defineStore("reddit", {
  state: (): RedditStoreState => ({
    posts: [],
    postStates: {},
    selectedPost: null,
    after: null,
    error: null,
    loading: false,
    isMobile: false,
  }),

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
    setPosts(posts: RedditPost[]) {
      this.posts = posts;
    },

    addPosts(posts: RedditPost[]) {
      this.posts = [...this.posts, ...posts];
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
    },

    setSelectedPost(post: RedditPost | null) {
      this.selectedPost = post;
    },

    setAfter(after: string | null) {
      this.after = after;
    },

    setLoading(loading: boolean) {
      this.loading = loading;
    },

    setError(error: string | null) {
      this.error = error;
    },

    setIsMobile(isMobile: boolean) {
      this.isMobile = isMobile;
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
    },

    loadStoredState(savedState: RedditStoreState) {
      if (savedState.posts) this.posts = savedState.posts;
      if (savedState.postStates) this.postStates = savedState.postStates;
      if (savedState.selectedPost) this.selectedPost = savedState.selectedPost;
      if (savedState.after) this.after = savedState.after;
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
        this.saveState();
      } catch (error) {
        this.setError("Failed to load posts. Please try again.");
        console.error("Error loading posts:", error);
      } finally {
        this.setLoading(false);
      }
    },

    markAsRead(postId: string) {
      this.setPostState(postId, { isRead: true });
      this.saveState();
    },

    markAsDismissing(postId: string) {
      this.setPostState(postId, { isDismissing: true });
      this.saveState();
    },

    toggleRead(postId: string) {
      const currentState = this.postStates[postId];
      const isRead = currentState ? currentState.isRead : false;

      this.setPostState(postId, { isRead: !isRead });
      this.saveState();
    },

    dismissPost(postId: string) {
      this.setPostState(postId, { isDismissed: true });

      if (this.selectedPost?.id === postId) {
        this.setSelectedPost(null);
      }

      this.saveState();
    },

    dismissAll() {
      this.dismissAllPosts(this.visiblePosts);
      this.saveState();
    },

    selectPost(post: RedditPost) {
      this.setSelectedPost(post);
      this.markAsRead(post.id);
    },

    saveState() {
      const stateToSave = {
        posts: this.posts,
        postStates: this.postStates,
        selectedPost: this.selectedPost,
        after: this.after,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    },

    loadState() {
      try {
        const savedState = localStorage.getItem(STORAGE_KEY);
        if (savedState) {
          const parsedState = JSON.parse(savedState);
          this.loadStoredState(parsedState);
        }
      } catch (error) {
        console.error("Error loading state:", error);
      }
    },
  },
});
