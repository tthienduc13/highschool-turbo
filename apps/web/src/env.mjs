import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NOTIFICATION_APPLICATION_IDENTIFIER: z.string().min(1),
  },
  runtimeEnv: {
    NOTIFICATION_APPLICATION_IDENTIFIER:
      process.env.NOTIFICATION_APPLICATION_IDENTIFIER,
  },
});
