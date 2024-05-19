export function assetImageUrl(name) {
  return new URL(`../assets/images/${name}`, import.meta.url).href
}

export const noImage = assetImageUrl('placeholder.png')