export const createFormatter = () =>
  new Intl.NumberFormat("en-US", {
    style: "unit",
    unit: "byte",
    notation: "compact",
  })
