# Delivery notes

## Dependency security decision

The original task environment lists Node 16.15 and npm 8.11, with `axios` declared as `^0.27.2`. During local setup I reviewed the dependency tree against recent npm supply-chain incidents before continuing work.

I updated `axios` to `1.15.2` and kept it pinned. This was intentional. The older `0.27.2` release is not one of the known compromised Axios versions from the March 2026 npm incident (`1.14.1` and `0.30.4`), but it is an old release with known security advisories. I chose not to keep that version in my local working tree.

The repository has a mismatch between the stated Node 16.15 environment and some currently resolved transitive packages that declare Node 20+ engines. Because this is an interview task rather than a production dependency migration, I kept the dependency change limited to the security-driven Axios update instead of broadening the scope further.

Verification performed:

- Checked the lockfile for known malicious package/version pairs from recent npm supply-chain incidents, including Axios, `plain-crypto-js`, `debug`, `chalk`, `eslint-config-prettier`, Nx, and Mini Shai-Hulud affected namespaces.
- Confirmed no matching malicious package/version pair was present.
- Ran `npm audit signatures`; all 1368 installed packages had verified npm registry signatures, and 101 packages had verified attestations.

## 
This project doesn't work on node 16. I used node 22.
