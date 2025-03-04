export interface Asset {
  contentType: string
  size: number
  createdAt: string
  updatedAt: string
  downloadCount: number
  downloadUrl: string
}

export interface Release {
  id: number
  tag: string
  author: string
  name: string
  draft: boolean
  prerelease: boolean
  createdAt: string
  publishedAt: string
  markdown: string
  html: string
  assets: Array<Asset>
}

export interface LatestReleaseResponse {
  release: Release
}

export interface ReleasesResponse {
  releases: Array<Release>
}
