"use client";

import { signIn } from "next-auth/react";

import { Button } from "@highschool/ui/components/ui/button";

import { IconBrandGoogleFilled } from "@tabler/icons-react";

function SignInModule() {
  return (
    <Button
      size={"lg"}
      className="flex h-12 w-full items-center gap-x-2"
      variant={"default"}
      onClick={async () => {
        await signIn("google", {
          redirect: false,
        });
      }}
    >
      <IconBrandGoogleFilled size={18} />
      <span>Tiếp tục với Google</span>
    </Button>
  );
}

export default SignInModule;
