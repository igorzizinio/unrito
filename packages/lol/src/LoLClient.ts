import type { RiotClient } from "@unrito/core";
import { SummonerModule } from "./modules/SummonerModule";

export class LolClient {
  public readonly summoner: SummonerModule;

  constructor(private readonly core: RiotClient) {
    this.summoner = new SummonerModule(this.core);
  }
}
