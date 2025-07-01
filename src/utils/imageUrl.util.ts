import type { RedditPost } from "@/types/reddit";

export const getImageUrl = (post: RedditPost): string | null => {
  if (post.preview && post.preview.images && post.preview.images.length > 0) {
    const image = post.preview.images[0];

    if (image.source && image.source.url) {
      return image.source.url.replace(/&amp;/g, "&");
    }
  }

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
