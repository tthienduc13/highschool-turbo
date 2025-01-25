import Image from "next/image";

import { SignInForm } from "./sign-in-form";

function SignInModule() {
  return (
    <div>
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <a
            href="#"
            className="flex items-center gap-2 self-center font-medium"
          >
            {/* <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc. */}
            <Image
              src={"/logo-with-text.svg"}
              alt="Logo with text"
              width={100}
              height={50}
              sizes="(max-width: 768px) 32px, 100px"
              className="hidden w-full md:block md:h-10"
            />
          </a>
          <SignInForm />
        </div>
      </div>
    </div>
  );
}

export default SignInModule;
