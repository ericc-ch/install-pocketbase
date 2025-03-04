import fs from "node:fs/promises"
import os from "node:os"
import path from "node:path"

import { getPlatform } from "./get-platform"

// Won't change during runtime, so it's fine even if it's static
const TMP_DIR = await fs.mkdtemp(path.join(os.tmpdir(), "pocketbase-"))
const DOWNLOAD_PATH = path.join(TMP_DIR, "pocketbase.zip")
const BINARY_PATH = path.join(process.cwd(), "pocketbase")

export const BASE_URL_UNGH = "https://ungh.cc"

// There's no way OS can change during runtime right??
export const ARCH = getPlatform()

export const PATHS = {
  TMP_DIR,
  DOWNLOAD_PATH,
  BINARY_PATH,
}
