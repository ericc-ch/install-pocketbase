import { defineCommand, runMain } from "citty"
import consola from "consola"
import { Buffer } from "node:buffer"
import fs from "node:fs/promises"

import { PATHS } from "./lib/constants"
import { createFormatter } from "./lib/create-formatter"
import {
  getDownloadUrl,
  getDownloadUrlInteractive,
} from "./lib/get-download-url"
import { getPlatform } from "./lib/get-platform"
import { unzip } from "./lib/unzip"
import { install } from "./main"

const main = defineCommand({
  meta: {
    name: "pocketbase-installer",
    description: "Install pocketbase using npx",
  },
  args: {
    tag: {
      type: "string",
      alias: "t",
      required: false,
      default: "latest",
      description: "Version tag to install (default: latest)",
    },
    platform: {
      type: "string",
      alias: "p",
      required: false,
      default: getPlatform(),
      description: "Platform to install (default: os.platform + os.arch)",
    },
    interactive: {
      type: "boolean",
      alias: "i",
      required: false,
      default: false,
      description: "Interactive mode (default: false)",
    },
  },
  run: async ({ args }) => {
    try {
      const downloadUrl =
        args.interactive ?
          await getDownloadUrlInteractive()
        : await getDownloadUrl(args)

      consola.info(`Downloading from ${downloadUrl}...`)

      const formatter = createFormatter()

      // Log every n%
      const logInterval = 10

      // Sometimes multiple logs can be rounded to the same number
      // Only log them once
      let lastPercentage = -1

      const blob = await install(downloadUrl, {
        onProgress: (progress, total) => {
          const percent = Math.round((progress / total) * 100)

          if (percent % logInterval !== 0) return
          if (percent === lastPercentage) return

          lastPercentage = percent

          console.info(
            `Downloaded ${formatter.format(progress)} / ${total} (${percent}%)`,
          )
        },
      })

      const arrayBuffer = await blob.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      await fs.writeFile(PATHS.DOWNLOAD_PATH, buffer)
      await unzip(PATHS.DOWNLOAD_PATH, PATHS.TMP_DIR)
      await fs.copyFile(PATHS.TMP_DIR, PATHS.BINARY_PATH)

      consola.success(`Pocketbase installed to ${PATHS.BINARY_PATH}`)

      await fs.rm(PATHS.TMP_DIR, { recursive: true })
      consola.info(`Cleaned up temporary files at ${PATHS.TMP_DIR}`)
    } catch (error) {
      consola.error(error)
      process.exit(1)
    }
  },
})

void runMain(main)
