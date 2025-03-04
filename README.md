# pocketbase-installer

Install PocketBase easily using `npx`!

## Usage

**Install the latest version:**

```bash
npx pocketbase-installer@latest
```

**Install a specific version:**

```bash
npx pocketbase-installer --tag <version>
```

**Install for a specific platform:**

```bash
npx pocketbase-installer --platform <platform>
```

**Interactive mode:**

```bash
npx pocketbase-installer --interactive
```

## Options

- `--tag`, `-t`: Version tag to install. Defaults to `latest`.
- `--platform`, `-p`: Platform to install. Defaults to your OS platform and architecture.
- `--interactive`, `-i`: Interactive mode. Prompts you to select a version from the available releases. Defaults to `false`.
