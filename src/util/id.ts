const idCountMap: { [key: string]: number } = {};

export function generateTemporarilyId(name: string): string {
  if (!idCountMap[name]) {
    idCountMap[name] = 1;
  } else {
    idCountMap[name] = idCountMap[name] + 1;
  }
  return `${name}-${idCountMap[name]}`;
}
