
# Unrito

A modular, type-safe, and scalable SDK for the Riot Games API.

Unrito is designed to provide a clean and maintainable abstraction layer over Riot’s APIs, following their official product and module structure while offering a developer-friendly interface.

---

## 📦 Architecture Overview

Unrito is built as a **monorepo** using `pnpm workspaces`, with fully isolated packages per game.

### Package Structure

```

unrito/
packages/
core/
lol/
tft/
valorant/

````

### Philosophy

- **Core handles infrastructure**
- **Game packages define endpoints**
- **Modules mirror Riot’s official API structure**
- **Versioning is abstracted from the user**

---

## 🧠 Core Responsibilities (`@unrito/core`)

The core package is game-agnostic and contains all shared infrastructure logic.

It is responsible for:

- HTTP requests
- API key handling
- Region routing
- Rate limiting (future)
- Retry strategies (future)
- Error normalization
- Optional caching (future)
- Middleware system (future)

The core exposes a single `RiotCore` class:

```ts
const core = new RiotCore({
  apiKey: process.env.RIOT_KEY
})
````

Game packages depend on the core but never reimplement HTTP logic.

---

## 🎮 Game Packages (Example: `@unrito/lol`)

Each game has its own package to avoid unnecessary bundle size and dependencies.

For example:

```
@unrito/lol
  modules/
    summoner/
    match/
    league/
    championMastery/
    spectator/
```

Each module corresponds directly to Riot’s official API modules:

* `summoner-v4`
* `match-v5`
* `league-v4`
* etc.

### Example Usage

```ts
import { RiotCore } from "@unrito/core"
import { LolClient } from "@unrito/lol"

const core = new RiotCore({ apiKey: "..." })
const lol = new LolClient(core)

const summoner = await lol.summoner.byName("br1", "PlayerName")
```

---

## 🏗 Design Principles

### 1️⃣ Product-Based Separation

Packages are separated per Riot game:

* `@unrito/lol`
* `@unrito/tft`
* `@unrito/valorant`
* etc.

Users install only what they need.

---

### 2️⃣ Module-Based Structure (Inside Each Game)

Modules follow Riot’s official structure:

```
summoner/
match/
league/
```

This ensures:

* Predictability
* Alignment with official documentation
* Easier maintenance
* Easier upgrades when Riot changes versions

---

### 3️⃣ Version Abstraction

Users do **not** deal with version numbers like `v4` or `v5`.

Unrito handles versioning internally.
If Riot upgrades an endpoint, it is updated internally without breaking the public API (when possible).

---

### 4️⃣ Thin Modules, Smart Core

Modules only define:

* Endpoint paths
* Parameters
* Required region type

They never:

* Perform HTTP requests
* Handle rate limiting
* Manage headers

All infrastructure lives in `@unrito/core`.

---

## 🚀 Future Enhancements

* Smart regional routing (platform vs regional)
* Automatic rate limit handling per route
* Middleware system (similar to Axios interceptors)
* Built-in caching support
* Generated TypeScript types from Riot OpenAPI
* Advanced error mapping

---

## 📌 Why Unrito?

* Modular by design
* Fully typed
* Scalable architecture
* Clean separation of concerns
* Suitable for production applications
* Designed as a long-term maintainable SDK

---

## ⚙ Development

This project uses:

* `pnpm workspaces`
* TypeScript
* Monorepo structure

To build all packages:

```bash
pnpm build
```

---

## 📄 License

MIT


**NOTICE:** This project is **NOT** afiliated with Riot Games, Inc.
