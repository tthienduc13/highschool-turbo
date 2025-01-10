import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_LANDING_URL: z.string(),
    NEXT_PUBLIC_API_URL: z.string(),
    NEXT_PUBLIC_APP_URL: z.string(),
    NEXT_PUBLIC_CLOUDINARY_USER_PRESET: z.string(),
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string(),
    NEXT_PUBLIC_UNSPLASH_ACCESS_KEY: z.string(),
    NEXT_PUBLIC_GAME_URL: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_LANDING_URL: process.env.NEXT_PUBLIC_LANDING_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_CLOUDINARY_USER_PRESET:
      process.env.NEXT_PUBLIC_CLOUDINARY_USER_PRESET,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    NEXT_PUBLIC_UNSPLASH_ACCESS_KEY:
      process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
    NEXT_PUBLIC_GAME_URL: process.env.NEXT_PUBLIC_GAME_URL,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
