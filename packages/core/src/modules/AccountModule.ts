import { RiotClient } from "../RiotClient";
import { RegionalRegion } from "../routing/regions";
import { RiotAccount } from "../types";

export class AccountModule {
  constructor(private readonly client: RiotClient) {}

  async byRiotId(
    gameName: string,
    tagLine: string,
    regional?: RegionalRegion,
  ): Promise<RiotAccount> {
    const region = this.client.resolveRegional(regional);

    return this.client
      .getHttpClient()
      .getRegional<RiotAccount>(
        region,
        `/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`,
      );
  }

  async byPuuid(
    puuid: string,
    regional?: RegionalRegion,
  ): Promise<RiotAccount> {
    const region = this.client.resolveRegional(regional);

    return this.client
      .getHttpClient()
      .getRegional<RiotAccount>(
        region,
        `/riot/account/v1/accounts/by-puuid/${encodeURIComponent(puuid)}`,
      );
  }
}
