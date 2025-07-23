
export function formatDateTime(dt: string) {
  if (!dt) return "";
  const d = new Date(dt);
  return d.toLocaleString("vi-VN", {
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export function getGenderLabel(genderKey: string | number, genders: any[]) {
  const keyStr = String(genderKey).toLowerCase();
  return genders.find((g) => String(g.key).toLowerCase() === keyStr)?.label || genderKey;
}

export function getCategoryLabel(categoryKey: string | number, categories: any[]) {
  const keyStr = String(categoryKey).toLowerCase();
  return categories.find((c) => String(c.key).toLowerCase() === keyStr)?.label || categoryKey;
}