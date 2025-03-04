import fs from "node:fs/promises"
import os from "node:os"
import path from "node:path"

// Won't change during runtime, so it's fine even if it's static
const TMP_DIR = await fs.mkdtemp(path.join(os.tmpdir(), "install-pocketbase-"))
const DOWNLOAD_PATH = path.join(TMP_DIR, "pocketbase.zip")
const BINARY_PATH = path.join(process.cwd(), "pocketbase")

export const BASE_URL_UNGH = "https://ungh.cc"

export const PATHS = {
  TMP_DIR,
  DOWNLOAD_PATH,
  BINARY_PATH,
}
