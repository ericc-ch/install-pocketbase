export const parseDownloadUrl = (url: string) => {
  const file = url.split("/").at(-1)
  const platform = file?.split("_").at(-2)
  const arch = file?.split("_").at(-1)?.split(".").at(0)

  return [platform, arch] as const
}
