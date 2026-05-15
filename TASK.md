# Delivery notes

## Dependency security

Before starting the feature work, I checked the resolved dependency tree because the task was based on an old Axios range. The README listed `axios` as `^0.27.2`. That version was not one of the compromised Axios releases from the March 2026 incident (`1.14.1` and `0.30.4`), but it is old and already has known advisories, so I did not want to leave the dependency state unreviewed.

I kept this change narrow: `axios` is updated and pinned, while the rest of the package stack stays aligned with the repository's existing Vite/Vitest setup.

Checks I ran:

- Checked the lockfile for known malicious package/version pairs, including Axios, `plain-crypto-js`, `debug`, `chalk`, `eslint-config-prettier`, Nx, and Mini Shai-Hulud affected namespaces.
- I did not find any matching malicious package/version pair.
- Ran `npm audit signatures`; 1368 installed packages had verified npm registry signatures, and 101 packages had verified attestations.

## Build and typecheck compatibility

The README still mentions Node 16.15, but the repository had already moved past that baseline before my feature work. Commit `a082bb6` (`chore: update dependencies`) by Agustin Amato introduced the Vite/Vitest/jsdom test setup while keeping `typescript` on `~4.5.5`; my feature commit `42674b6` inherited that stack.

The build/typecheck issue came from that mismatch: newer resolved tooling and types were being used with an old TypeScript baseline. I kept the inherited Vite/Vitest/jsdom direction and updated TypeScript to a compatible 5.x release. Verification was run on the current local Node setup instead of rolling the project back to a Node 16-era dependency set.
