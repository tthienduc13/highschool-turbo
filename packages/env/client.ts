import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    client: {
        NEXT_PUBLIC_LANDING_URL: z.string(),
        NEXT_PUBLIC_API_URL: z.string(),
        NEXT_PUBLIC_APP_URL: z.string(),
        NEXT_PUBLIC_CLOUDINARY_USER_PRESET: z.string(),
        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string(),
    },
    runtimeEnv: {
        NEXT_PUBLIC_LANDING_URL: process.env.NEXT_PUBLIC_LANDING_URL,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
        NEXT_PUBLIC_CLOUDINARY_USER_PRESET:
            process.env.NEXT_PUBLIC_CLOUDINARY_USER_PRESET,
        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
            process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    },
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
