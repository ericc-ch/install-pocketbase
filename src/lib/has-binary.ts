import { x } from "tinyexec"

export async function hasBinary(name: string) {
  const { exitCode } = await x("which", [name])
  return exitCode === 0
}
