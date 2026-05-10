const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const getApiOrigin = () => {
  const baseUrl = String(import.meta.env.VITE_API_URL || "").trim();
  if (!baseUrl) return "";

  try {
    return trimTrailingSlash(new URL(baseUrl).origin);
  } catch {
    return trimTrailingSlash(baseUrl);
  }
};

export const resolveMediaUrl = (value?: string | null) => {
  if (!value) return "";
  if (/^(https?:|data:|blob:)/i.test(value)) return value;
  if (!value.startsWith("/")) return value;

  const apiOrigin = getApiOrigin();
  if (!apiOrigin) return value;
  return `${apiOrigin}${value}`;
};
