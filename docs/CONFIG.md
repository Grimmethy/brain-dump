# External configuration

These six settings live outside this repository. The operator supplies their values at runtime. Every value below is a placeholder example, not a real value. No value for a secret is ever written in this file.

## store path

- Source: not yet defined in this repository (env var, file, or flag to be chosen when the setting is implemented)
- Type: path (string)
- Default: no default; required.
- Example: `/path/to/store`

## vault dir

- Source: not yet defined in this repository (env var, file, or flag to be chosen when the setting is implemented)
- Type: path (string)
- Default: no default; required.
- Example: `/path/to/vault`

## project registry

- Source: not yet defined in this repository (file or flag to be chosen when the setting is implemented)
- Type: path to a registry file
- Default: no default; required.
- Example: `/path/to/projects.registry`

## operator account allowlist

- Source: not yet defined in this repository (file or env var to be chosen when the setting is implemented)
- Type: list of account identifiers
- Default: no default; required.
- Example: `<account-id>`

## PF base URL and token

### PF base URL

- Source: not yet defined in this repository (env var to be chosen when the setting is implemented)
- Type: URL (string)
- Default: no default; required.
- Example: `https://pf.example.invalid`

### PF token

- Source: environment variable named `<PF_TOKEN_ENV_VAR>` (placeholder; the real variable name is not yet defined)
- Type: secret string. The value is read from the environment only and is never stored in the repository.
- Default: no default; required.
- Example: the variable is set outside the repository, for example `<PF_TOKEN_ENV_VAR>=<token>`

## Forge URL

- Source: not yet defined in this repository (env var or flag to be chosen when the setting is implemented)
- Type: URL (string)
- Default: no default; required.
- Example: `https://forge.example.invalid`
