# Validation Report: ASP.NET Core #68516

This report covers the evidence collected for navigating between pages that use different Blazor render modes. Results are evaluated against the failure criteria in [dotnet/aspnetcore#68516](https://github.com/dotnet/aspnetcore/issues/68516): the destination must render, its URL and content must agree, interactive pages must become interactive, navigation must not require recovery, and the browser console must contain no navigation error.

## Environment

| Field | Value |
|---|---|
| SDK/runtime | .NET `11.0.0-preview.7.26381.103` |
| Browsers | Chrome and Microsoft Edge |
| Run modes represented below | Debug and published Release |
| Required minimum build | .NET 11 Preview 7 or later |

## Core Results

`Not captured` means the result was recorded during testing but no correctly named screenshot exists in this evidence folder. It does not mean the scenario failed.

| Scenario | Test Case | Action | Debug Evidence | Debug | Published Evidence | Published |
|---|---|---|---|---|---|---|
| S1 | TC-S1-01 | `/` -> `/weather` | [View](./videos/S1-TC01-home-to-weather.mp4) | Fail | [View](./videos/S1-TC01-home-to-weather.mp4) | Fail |
| S2 | TC-S2-01 | `/counter` -> `/` | [View](./screenshots/Debug/S2-TC01-counter-to-home.png) | Pass | [View](./screenshots/Publish/S2-TC01-counter-to-home.png) | Pass |
| S3 | TC-S3-01 | `/counter` -> `/about` | [View](./screenshots/Debug/S3-TC01-counter-to-about.png) | Pass | [View](./screenshots/Publish/S3-TC01-counter-to-about.png) | Pass |
| S4 | TC-S4-01 | `/` -> `/counter` | [View](./screenshots/Debug/S4-TC01-home-to-counter.png) | Pass | [View](./screenshots/Publish/S4-TC01-home-to-counter.png) | Pass |
| S4 | TC-S4-03 | `/` -> `/about` | [View](./screenshots/Debug/S4-TC03-home-to-about.png) | Pass | [View](./screenshots/Publish/S4-TC03-home-to-about.png) | Pass |
| S4 | TC-S4-05 | `/counter` -> `/weather` | Same as issue TC-S1-011 | Fail | Same as issue TC-S1-011 | Fail |
| S4 | TC-S4-07 | `/weather` -> `/` | [View](./screenshots/Debug/S4-TC07-weather-to-home.png) | Pass | [View](./screenshots/Publish/S4-TC07-weather-to-home.png) | Pass |
| S4 | TC-S4-08 | `/weather` -> `/counter` | [View](./screenshots/Debug/S4-TC08-weather-to-counter.png) | Pass | [View](./screenshots/Publish/S4-TC08-weather-to-counter.png) | Pass |
| S4 | TC-S4-09 | `/weather` -> `/about` | [View](./screenshots/Debug/S4-TC09-weather-to-about.png) | Pass | [View](./screenshots/Publish/S4-TC09-weather-to-about.png) | Pass |
| S4 | TC-S4-10 | `/about` -> `/` | [View](./screenshots/Debug/S4-TC10-about-to-home.png) | Pass | [View](./screenshots/Publish/S4-TC10-about-to-home.png) | Pass |
| S4 | TC-S4-11 | `/about` -> `/counter` | [View](./screenshots/Debug/S4-TC11-about-to-counter.png) | Pass | [View](./screenshots/Publish/S4-TC11-about-to-counter.png) | Pass |
| S4 | TC-S4-12 | `/about` -> `/weather` | [View](./screenshots/Debug/S4-TC12-about-to-weather.png) | Pass | [View](./screenshots/Publish/S4-TC12-about-to-weather.png) | Pass |
| S5 | TC-S5-01 | `/` -> `/weather` -> Back | [View](./screenshots/Debug/S5-TC01-back-navigation.png) | Pass | [View](./screenshots/Publish/S5-TC01-back-navigation.png) | Pass |
| S5 | TC-S5-02 | Back test -> Forward | [View](./screenshots/Debug/S5-TC02-forward-navigation.png) | Pass | [View](./screenshots/Publish/S5-TC02-forward-navigation.png) | Pass |
| S6 | TC-S6-01 | Type `/weather` | [View](./screenshots/Debug/S6-TC01-direct-weather.png) | Pass | [View](./screenshots/Publish/S6-TC01-direct-weather.png) | Pass |
| S6 | TC-S6-02 | Type `/counter` | [View](./screenshots/Debug/S6-TC02-direct-counter.png) | Pass | [View](./screenshots/Publish/S6-TC02-direct-counter.png) | Pass |
| S6 | TC-S6-03 | Type `/about` | [View](./screenshots/Debug/S6-TC03-direct-about.png) | Pass | [View](./screenshots/Publish/S6-TC03-direct-about.png) | Pass |
| S7 | TC-S7-01 | Navigate all routes five times | [Video](./videos/S62-TC01-repeated-navigation-stress-test.png.mp4) | Pass | [Video](./videos/S62-TC01-repeated-navigation-stress-test-release.mp4) | Pass |

## Route and Metadata Setup

| Route | Render mode | Project | Page title |
|---|---|---|---|
| `/` | Interactive WebAssembly | Client | Yes |
| `/counter` | Interactive WebAssembly | Client | No |
| `/weather` | Interactive Server | Server | Yes |
| `/about` | Static SSR | Server | No |

The source contains `[PersistentState]` coverage and a JavaScript initializer. The final validation record must also include page-source evidence confirming these comments are emitted:

```text
<!--Blazor-WebAssembly:
<!--Blazor-Web-Initializers:
<!--Blazor-Server-Component-State:
<!--Blazor-WebAssembly-Component-State:
```

Metadata-comment source evidence is not currently stored in this evidence folder, so this requirement remains unverified by the report.

### Failure: S1-TC01-home-to-weather

**Observed:** When navigating to `/weather`, the page briefly shows `Loading...` before the weather table renders, causing visible flicker.

**Configuration:** App uses Interactive Auto. Weather page uses `@rendermode InteractiveServer`.

**Expected:** Navigation should render smoothly without visible flicker.

**Failure condition:**  
The flicker occurs when navigating to the `/weather` page from any other page in the sample.

**Affected navigation paths:**
- `/` → `/weather`
- `/counter` → `/weather`
- `/about` → `/weather`

The issue is not observed when the explicit `@rendermode InteractiveServer` is removed from the Weather page.

**Test environment:**
- .NET version: `11.0.0-preview.7.26381.103`
- Browsers tested: Chrome and Microsoft Edge
- Run modes tested: Debug and published Release output
- Result: Flicker reproduced in both browsers and both run modes