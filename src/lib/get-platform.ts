import os from "node:os"

export const getPlatform = () => {
  let arch = os.arch()
  if (arch === "x64") arch = "amd64"

  return `${os.platform()}_${arch}`
}
