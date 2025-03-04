import type { LatestReleaseResponse } from "./types"

import { BASE_URL_UNGH } from "../lib/constants"

const URL_LATEST_RELEASE = `${BASE_URL_UNGH}/repos/pocketbase/pocketbase/releases/latest`

export async function getLatestRelease() {
  const latestResponse = await fetch(URL_LATEST_RELEASE)
  return (await latestResponse.json()) as LatestReleaseResponse
}
