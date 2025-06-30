export interface RedditPost {
  id: string;
  title: string;
  author: string;
  created_utc: number;
  score: number;
  num_comments: number;
  thumbnail: string;
  url: string;
  permalink: string;
  subreddit: string;
  selftext?: string;
  preview?: {
    images: Array<{
      source: {
        url: string;
        width: number;
        height: number;
      };
      resolutions: Array<{
        url: string;
        width: number;
        height: number;
      }>;
    }>;
  };
  is_video: boolean;
  media?: never;
  post_hint?: string;
}

export interface RedditApiResponse {
  data: {
    children: Array<{
      data: RedditPost;
    }>;
    after: string | null;
    before: string | null;
  };
}

export interface PostState {
  isRead: boolean;
  isDismissed: boolean;
}

export interface RedditStoreState {
  posts: RedditPost[];
  postStates: Record<string, PostState>;
  selectedPost: RedditPost | null;
  after: string | null;
  loading: boolean;
  error: string | null;
  isMobile: boolean;
}
