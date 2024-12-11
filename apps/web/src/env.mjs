import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    client: {
        NEXT_PUBLIC_LANDING_URL: z.string(),
    },
    /**
     * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
     */
    runtimeEnv: {
        NEXT_PUBLIC_LANDING_URL: process.env.NEXT_PUBLIC_LANDING_URL,
    },
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
