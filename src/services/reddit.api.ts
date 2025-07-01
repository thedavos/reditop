import type { RedditApiResponse } from "@/types/reddit";
import axios from "axios";

const REDDIT_API_BASE = "https://cors-anywhere.com/https://api.reddit.com";

export class RedditService {
  static async getTopPosts(
    limit = 25,
    after?: string | null
  ): Promise<RedditApiResponse> {
    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        raw_json: "1",
      });

      if (after) {
        params.append("after", after);
      }

      const response = await axios.get<RedditApiResponse>(
        `${REDDIT_API_BASE}/r/all/top.json?${params.toString()}`
      );

      return response.data;
    } catch (e) {
      const error = e as Error;
      console.error("Error fetching posts: ", error.message);
      throw error;
    }
  }
}
