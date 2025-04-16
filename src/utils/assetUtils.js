/**
 * 获取资源URL
 * @param {string} assetPath 资源相对路径
 * @returns {string} 完整资源URL
 */
export function getAssetUrl(assetPath) {
  return new URL(`../assets/${assetPath}`, import.meta.url).href;
}