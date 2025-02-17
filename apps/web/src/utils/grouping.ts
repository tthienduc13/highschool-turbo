import { relevantLabel } from "./time";

export const groupIntoTimeline = <
  K extends keyof T,
  T extends Record<K, string>,
>(
  data: T[],
  key: K = "createdAt" as K,
): { label: string; items: T[] }[] => {
  const groups: { label: string; items: T[] }[] = [];

  for (const item of data.sort((a, b) => {
    const dateA = new Date(a[key]);
    const dateB = new Date(b[key]);

    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
      throw new Error("The provided key must point to a valid date string.");
    }

    return dateB.getTime() - dateA.getTime();
  })) {
    const label = relevantLabel(new Date(item[key]));
    const group = groups.find((group) => group.label === label);

    if (group) {
      group.items.push(item);
    } else {
      groups.push({ label, items: [item] });
    }
  }

  return groups;
};
