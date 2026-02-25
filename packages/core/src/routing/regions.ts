export const PlatformRegion = {
  BR: "br1",
  NA: "na1",
  EUW: "euw1",
  EUNE: "eun1",
  KR: "kr",
  JP: "jp1",
  LAN: "la1",
  LAS: "la2",
  OCE: "oc1",
  TR: "tr1",
  RU: "ru",
} as const;

export type PlatformRegionKey = keyof typeof PlatformRegion;
export type PlatformRegion = (typeof PlatformRegion)[PlatformRegionKey];

export const RegionalRegion = {
  AMERICAS: "americas",
  EUROPE: "europe",
  ASIA: "asia",
  SEA: "sea",
} as const;

export type RegionalRegionKey = keyof typeof RegionalRegion;
export type RegionalRegion = (typeof RegionalRegion)[RegionalRegionKey];
