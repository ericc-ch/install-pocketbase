import { x } from "tinyexec"

export async function unzip(src: string, dest: string) {
  await x("unzip", ["-o", src, "-d", dest])
}
