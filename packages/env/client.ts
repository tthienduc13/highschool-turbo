import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    client: {
        NEXT_PUBLIC_LANDING_URL: z.string(),
        NEXT_PUBLIC_API_URL: z.string(),
        NEXT_PUBLIC_APP_URL: z.string(),
    },
    runtimeEnv: {
        NEXT_PUBLIC_LANDING_URL: process.env.NEXT_PUBLIC_LANDING_URL,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    },
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
