export interface InstallOptions {
  onProgress?: (progress: number, total: number) => void
}

export async function install(url: string, options: InstallOptions = {}) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to download ${url}`)
  }

  const sizeRaw = response.headers.get("content-length")
  const sizeInt = Number.parseInt(sizeRaw || "0", 10)

  const reader = response.body?.getReader()

  if (!reader) {
    throw new Error("Cannot get response body reader!")
  }

  let downloadedBytes = 0
  const buffer: Array<Uint8Array> = []

  while (true) {
    const stream = await reader.read()

    if (stream.done) {
      break
    }

    buffer.push(stream.value)

    downloadedBytes += stream.value.byteLength

    options.onProgress?.(downloadedBytes, sizeInt)
  }

  return new Blob(buffer)
}

export { getDownloadUrl } from "./lib/get-download-url"
