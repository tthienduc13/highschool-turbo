"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function Scroll() {
  const pathName = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathName]);

  return <></>;
}
export default Scroll;
