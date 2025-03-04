import consola from "consola"
import process from "node:process"

import { getLatestRelease } from "../services/get-latest-release"
import { listReleases } from "../services/list-releases"
import { parseDownloadUrl } from "./parse-download-url"

interface InstallOptions {
  tag: string
  platform: string
}

export async function getDownloadUrlInteractive() {
  // TODO: Sometimes fetching in parallel causes ERROR fetch failed at node:internal/deps/undici/undici:13502:13
  // const [latest, releases] = await Promise.all([
  //   getLatestRelease(),
  //   listReleases(),
  // ])

  const latest = await getLatestRelease()
  const releases = await listReleases()

  const tag = await consola.prompt(
    `Which release tag do you want to install?`,
    {
      type: "select",
      options: ["latest", ...releases.releases.map((r) => r.tag)],
    },
  )

  const release =
    tag === "latest" ?
      latest.release
    : releases.releases.find((r) => r.tag === tag)

  if (!release) {
    consola.error(`Release ${tag} not found`)
    process.exit(1)
  }

  const platform = await consola.prompt(`Which platform?`, {
    type: "select",
    options: release.assets
      .map((asset) => parseDownloadUrl(asset.downloadUrl))
      .filter(([platform, arch]) => Boolean(platform) && Boolean(arch))
      .map(([platform, arch]) => `${platform}_${arch}`),
  })

  const downloadUrl = release.assets.find((asset) =>
    asset.downloadUrl.includes(platform),
  )?.downloadUrl

  if (!downloadUrl) {
    consola.error(`No asset found for ${platform}`)
    process.exit(1)
  }

  return downloadUrl
}

export async function getDownloadUrl(options: InstallOptions) {
  const latest = await getLatestRelease()
  const releases = await listReleases()

  const release =
    options.tag === "latest" ?
      latest.release
    : releases.releases.find((r) => r.tag === options.tag)

  if (!release) {
    throw new Error(
      `Release ${options.tag} not found, available releases: \n${releases.releases
        .map((r) => `- ${r.tag}`)
        .join("\n")}`,
    )
  }

  const downloadUrl = release.assets.find((asset) =>
    asset.downloadUrl.includes(options.platform),
  )?.downloadUrl

  if (!downloadUrl) {
    throw new Error(
      `No asset found for ${options.platform}, available assets: \n${release.assets
        .map((asset) => `- ${asset.downloadUrl}`)
        .join("\n")}`,
    )
  }

  return downloadUrl
}
