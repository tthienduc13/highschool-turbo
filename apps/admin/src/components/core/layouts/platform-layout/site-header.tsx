"use client";

import { IconBell, IconLayoutSidebar } from "@tabler/icons-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@highschool/ui/components/ui/breadcrumb";
import { Button } from "@highschool/ui/components/ui/button";
import { Separator } from "@highschool/ui/components/ui/separator";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

import { useSidebar } from "../../common/sidebar";
import { ThemeSwitcher } from "../../common/theme-switcher";

import { SearchForm } from "./search-form";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();
  const pathName = usePathname();

  const slugs = pathName
    .split("/")
    .filter((slug) => slug !== "")
    .map((slug) => slug.charAt(0).toUpperCase() + slug.slice(1));

  return (
    <header className="fle bg-background sticky top-0 z-50 w-full items-center border-b">
      <div className="flex h-[--header-height] items-center justify-between px-4">
        <div className="flex  w-full items-center gap-2 ">
          <Button
            className="size-8"
            size="icon"
            variant="ghost"
            onClick={toggleSidebar}
          >
            <IconLayoutSidebar />
          </Button>
          <Separator className="mr-2 h-4" orientation="vertical" />
          <Breadcrumb className="hidden sm:block">
            <BreadcrumbList>
              {slugs.map((slug, index) => (
                <Fragment key={slug}>
                  <BreadcrumbItem>
                    {index < slugs.length - 1 ? (
                      <BreadcrumbLink href={`/${slug}`}>{slug}</BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage> {slug} </BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {index < slugs.length - 1 && <BreadcrumbSeparator />}
                </Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex flex-row items-center gap-2">
          <SearchForm className="w-full sm:ml-auto sm:w-auto" />{" "}
          <Separator className="mr-2 h-4" orientation="vertical" />
          <ThemeSwitcher />
          <Separator className="mr-2 h-4" orientation="vertical" />
          <Button className="rounded-full " size={"icon"} variant={"ghost"}>
            <IconBell className="!size-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
