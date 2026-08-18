This report covers the core render-mode navigation scenarios, published output, and .NET 10 to .NET 11 upgrade validation that were tested.

| Scenario ID | Test Case ID | Test Case Name | Action | Debug Screenshot | Debug Result | Publish Screenshot | Publish Result |
|---|---|---|---|---|---|---|---|
| S1 | TC-S1-01 | WebAssembly to Interactive Server | `/` → `/weather` | `./screenshots/debug/S1-TC01-home-to-weather.png` | Fail | `./screenshots/publish/S1-TC01-home-to-weather.png` | Fail |
| S2 | TC-S2-01 | No PageTitle to Home | `/counter` → `/` | `./screenshots/debug/S2-TC01-counter-to-home.png` | Pass | `./screenshots/publish/S2-TC01-counter-to-home.png` | Pass |
| S3 | TC-S3-01 | WebAssembly to Static SSR | `/counter` → `/about` | `./screenshots/debug/S3-TC01-counter-to-about.png` | Pass | `./screenshots/publish/S3-TC01-counter-to-about.png` | Pass |
| S4 | TC-S4-01 | Home to Counter | `/` → `/counter` | `./screenshots/debug/S4-TC01-home-to-counter.png` | Pass | `./screenshots/publish/S4-TC01-home-to-counter.png` | Pass |
| S4 | TC-S4-03 | Home to About | `/` → `/about` | `./screenshots/debug/S4-TC03-home-to-about.png` | Pass | `./screenshots/publish/S4-TC03-home-to-about.png` | Pass |
| S4 | TC-S4-05 | Counter to Weather | `/counter` → `/weather` | `./screenshots/debug/S4-TC05-counter-to-weather.png` | Fail | `./screenshots/publish/S4-TC05-counter-to-weather.png` | Fail |
| S4 | TC-S4-07 | Weather to Home | `/weather` → `/` | `./screenshots/debug/S4-TC07-weather-to-home.png` | Pass | `./screenshots/publish/S4-TC07-weather-to-home.png` | Pass |
| S4 | TC-S4-08 | Weather to Counter | `/weather` → `/counter` | `./screenshots/debug/S4-TC08-weather-to-counter.png` | Pass | `./screenshots/publish/S4-TC08-weather-to-counter.png` | Pass |
| S4 | TC-S4-09 | Weather to About | `/weather` → `/about` | `./screenshots/debug/S4-TC09-weather-to-about.png` | Pass | `./screenshots/publish/S4-TC09-weather-to-about.png` | Pass |
| S4 | TC-S4-10 | About to Home | `/about` → `/` | `./screenshots/debug/S4-TC10-about-to-home.png` | Pass | `./screenshots/publish/S4-TC10-about-to-home.png` | Pass |
| S4 | TC-S4-11 | About to Counter | `/about` → `/counter` | `./screenshots/debug/S4-TC11-about-to-counter.png` | Pass | `./screenshots/publish/S4-TC11-about-to-counter.png` | Pass |
| S4 | TC-S4-12 | About to Weather | `/about` → `/weather` | `./screenshots/debug/S4-TC12-about-to-weather.png` | Fail | `./screenshots/publish/S4-TC12-about-to-weather.png` | Fail |
| S5 | TC-S5-01 | Browser Back Navigation | `/` → `/weather` → Back | `./screenshots/debug/S5-TC01-back-navigation.png` | Fail | `./screenshots/publish/S5-TC01-back-navigation.png` | Fail |
| S5 | TC-S5-02 | Browser Forward Navigation | Back test → Forward | `./screenshots/debug/S5-TC02-forward-navigation.png` | Pass | `./screenshots/publish/S5-TC02-forward-navigation.png` | Pass |
| S6 | TC-S6-01 | Direct URL Weather | Type `/weather` | `./screenshots/debug/S6-TC01-direct-weather.png` | Fail | `./screenshots/publish/S6-TC01-direct-weather.png` | Fail |
| S6 | TC-S6-02 | Direct URL Counter | Type `/counter` | `./screenshots/debug/S6-TC02-direct-counter.png` | Pass | `./screenshots/publish/S6-TC02-direct-counter.png` | Pass |
| S6 | TC-S6-03 | Direct URL About | Type `/about` | `./screenshots/debug/S6-TC03-direct-about.png` | Pass | `./screenshots/publish/S6-TC03-direct-about.png` | Pass |
| S7 | TC-S7-01 | Repeated Navigation Stress Test | Navigate all routes repeatedly | `./screenshots/debug/S7-TC01-repeated-navigation-stress-test.png` | Pass | `./screenshots/publish/S7-TC01-repeated-navigation-stress-test.png` | Pass |

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