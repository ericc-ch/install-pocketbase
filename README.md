# install-pocketbase

Install PocketBase easily using `npx`!

## Usage

**Make sure you have `unzip` installed on your system.**

**Install the latest version:**

```bash
npx install-pocketbase@latest
```

**Install a specific version:**

```bash
npx install-pocketbase --tag <version>
```

**Install for a specific platform:**

```bash
npx install-pocketbase --platform <platform>
```

**Interactive mode:**

```bash
npx install-pocketbase --interactive
```

## Programmatic Usage

You can also use `install-pocketbase` programmatically in your Node.js projects.

**Installation:**

```bash
npm install install-pocketbase
```

**Usage:**

```typescript
import { getDownloadUrl, install } from "install-pocketbase";

const downloadUrl = await getDownloadUrl({
  tag: "latest",
  platform: "linux_amd64",
});
await install(downloadUrl, {
  onProgress: (progress, total) => {
    console.log(`Downloaded ${progress} of ${total} bytes`);
  },
});
```

## Options

- `--tag`, `-t`: Version tag to install. Defaults to `latest`.
- `--platform`, `-p`: Platform to install. Defaults to your OS platform and architecture.
- `--interactive`, `-i`: Interactive mode. Prompts you to select a version from the available releases. Defaults to `false`.

## Credits

This project uses [ungh](https://unjs.io/packages/ungh) by [unjs](https://unjs.io/). Thanks for the awesome API proxy!
