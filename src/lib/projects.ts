export const PROJECT_IDS = [
  "skagersvagen",
  "groundworks",
  "infrastructure",
  "specialized",
  "building",
  "umea-centrum",
  "lulea-hamn",
  "skelleftea-campus",
  "pitea-industri",
] as const;

export type ProjectKey = (typeof PROJECT_IDS)[number];

export function projectKeyToNumber(key: string): string {
  const idx = PROJECT_IDS.indexOf(key as ProjectKey);
  if (idx === -1) return key;
  return String(idx + 1);
}

export function projectNumberToKey(num: string): ProjectKey | null {
  const idx = parseInt(num, 10) - 1;
  if (isNaN(idx) || idx < 0 || idx >= PROJECT_IDS.length) return null;
  return PROJECT_IDS[idx];
}
