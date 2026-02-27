import { AccountModule } from "./modules/AccountModule";
import { HttpClient } from "./http/HttpClient";
import type { PlatformRegion, RegionalRegion } from "./routing/regions";

export interface RiotClientOptions {
  apiKey: string;
  defaultPlatform?: PlatformRegion;
  defaultRegional?: RegionalRegion;
}

export class RiotClient {
  private readonly http: HttpClient;

  public readonly account: AccountModule;

  public readonly defaultPlatform?: PlatformRegion;
  public readonly defaultRegional?: RegionalRegion;

  constructor(options: RiotClientOptions) {
    this.defaultPlatform = options.defaultPlatform;
    this.defaultRegional = options.defaultRegional;

    this.http = new HttpClient({
      apiKey: options.apiKey,
    });

    this.account = new AccountModule(this);
  }

  getHttpClient() {
    return this.http;
  }

  resolveRegional(region?: RegionalRegion): RegionalRegion {
    const final = region ?? this.defaultRegional;
    if (!final) {
      throw new Error("Regional region not provided");
    }
    return final;
  }
}
