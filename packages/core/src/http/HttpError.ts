export class HttpError extends Error {
  public readonly status: number;
  public readonly statusText: string;
  public readonly data?: unknown;
  public readonly headers: Record<string, string>;

  constructor(
    status: number,
    statusText: string,
    data?: unknown,
    headers?: Record<string, string>,
  ) {
    super(`Riot API Error: ${status} ${statusText}`);
    this.name = "HttpError";

    this.status = status;
    this.statusText = statusText;
    this.data = data;
    this.headers = headers ?? {};
  }

  isRateLimit(): boolean {
    return this.status === 429;
  }

  get retryAfter(): number | null {
    return this.headers["retry-after"]
      ? Number(this.headers["retry-after"])
      : null;
  }

  toString() {
    return `${this.name}: ${this.status} ${this.statusText}`;
  }
}
