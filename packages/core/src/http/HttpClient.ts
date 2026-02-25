import { RegionalRegion } from "../routing/regions";
import { HttpError } from "./HttpError";
import type { HttpClientConfig, RequestOptions } from "./types";

export class HttpClient {
  private readonly apiKey: string;

  constructor(config: HttpClientConfig) {
    this.apiKey = config.apiKey;
  }

  async getRegional<T>(region: RegionalRegion, endpoint: string): Promise<T> {
    const baseUrl = `https://${region}.api.riotgames.com`;
    return this.get(baseUrl, endpoint);
  }

  async get<T>(
    baseUrl: string,
    endpoint: string,
    options?: RequestOptions,
  ): Promise<T> {
    const url = this.buildUrl(baseUrl, endpoint, options?.query);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Riot-Token": this.apiKey,
        ...options?.headers,
      },
    });

    const contentType = response.headers.get("content-type");
    const data = contentType?.includes("application/json")
      ? await response.json()
      : undefined;

    if (!response.ok) {
      throw new HttpError(
        response.status,
        response.statusText,
        data,
        Object.fromEntries(response.headers.entries()),
      );
    }

    return data as T;
  }

  private buildUrl(
    baseUrl: string,
    endpoint: string,
    query?: RequestOptions["query"],
  ): string {
    const url = new URL(endpoint, baseUrl);

    if (query) {
      for (const [key, value] of Object.entries(query)) {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      }
    }

    return url.toString();
  }
}
