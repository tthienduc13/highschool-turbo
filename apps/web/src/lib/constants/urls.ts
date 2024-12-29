import { env } from "@highschool/env";

export const WEBSITE_URL =
  env.NEXT_PUBLIC_LANDING_URL || "https://app.highschool.vn";
export const APP_URL = env.NEXT_PUBLIC_APP_URL;
