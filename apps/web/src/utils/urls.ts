import { APP_URL, WEBSITE_URL } from "@/lib/constants/urls";

export const getSafeRedirectUrl = (url: string) => {
  let safeUrl = url;

  if (!/^https?:\/\//.test(url)) {
    safeUrl = `${APP_URL}/${url}`.replace(/([^:])(\/\/+)/g, "$1/");
  }
  const parsed = new URL(safeUrl);

  if (
    ![WEBSITE_URL, APP_URL].some((u) => new URL(u).origin === parsed.origin)
  ) {
    return `${APP_URL}/`;
  }

  return safeUrl;
};
