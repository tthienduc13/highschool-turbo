"use client";

import { About } from "./about";
import { Developers } from "./developers";

function AboutUsModule() {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col justify-center gap-12 px-4 py-6 lg:px-10">
      <About />
      <Developers />
    </div>
  );
}
export default AboutUsModule;
