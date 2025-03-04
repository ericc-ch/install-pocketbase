import fs from "node:fs"
import { pipeline } from "node:stream"
import zlib from "node:zlib"

export function unzip(src: string, dest: string) {
  const _unzip = zlib.createUnzip()

  const { promise, resolve, reject } = Promise.withResolvers()

  const input = fs.createReadStream(src)
  const output = fs.createWriteStream(dest)

  const stream = pipeline(input, _unzip, output)

  stream.on("error", reject)
  stream.on("close", resolve)

  return promise
}
