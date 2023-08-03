export const isObject = (val) => val && val instanceof Object;

export function isArray(arrayElement) {
  return arrayElement && Array.isArray(arrayElement) && arrayElement.length > 0;
}
