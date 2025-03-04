import type { ReleasesResponse } from "./types"

import { BASE_URL_UNGH } from "../lib/constants"

const URL_RELEASES = `${BASE_URL_UNGH}/repos/pocketbase/pocketbase/releases`

export async function listReleases() {
  const latestResponse = await fetch(URL_RELEASES)
  return (await latestResponse.json()) as ReleasesResponse
}
