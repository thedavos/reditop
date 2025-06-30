import type { RedditPost } from "@/types/reddit";

export const getThumbnailUrl = (post: RedditPost): string | null => {
  if (
    post.thumbnail &&
    post.thumbnail.startsWith("http") &&
    !post.thumbnail.includes("self") &&
    !post.thumbnail.includes("default")
  ) {
    return post.thumbnail;
  }

  return null;
};
