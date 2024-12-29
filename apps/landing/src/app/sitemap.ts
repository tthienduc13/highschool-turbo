import { MetadataRoute } from "next";

import { env } from "@highschool/env";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    getEntry("/"),
    getEntry("tin-tuc"),
    getEntry("huong-nghiep"),
    getEntry("kho-tai-lieu"),
  ];
}

function getEntry(pathname: string) {
  return {
    url: getUrl(pathname),
    lastModified: new Date(),
  };
}

function getUrl(pathname: string) {
  return `${env.NEXT_PUBLIC_LANDING_URL}/${pathname === "/" ? "" : pathname}`;
}
