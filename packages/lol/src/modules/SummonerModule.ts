import type { RiotClient } from "@unrito/core";
import { RegionalRegion } from "@unrito/core/dist/routing/regions";

export class SummonerModule {
  constructor(private readonly core: RiotClient) {}

  async byPuuid(puuid: string, region?: RegionalRegion) {
    const resolvedRegion = this.core.resolveRegional(region);

    return this.core
      .getHttpClient()
      .getRegional(
        resolvedRegion,
        `/lol/summoner/v4/summoners/by-puuid/${encodeURIComponent(puuid)}`,
      );
  }
}
