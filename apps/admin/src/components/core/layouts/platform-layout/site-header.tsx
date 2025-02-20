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

import { useSidebar } from "../../common/sidebar";
import { ThemeSwitcher } from "../../common/theme-switcher";

import { SearchForm } from "./search-form";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="fle sticky top-0 z-50 w-full items-center border-b bg-background">
      <div className="flex h-[--header-height] items-center justify-between px-4">
        <div className="flex  w-full items-center gap-2 ">
          <Button
            className="h-8 w-8"
            size="icon"
            variant="ghost"
            onClick={toggleSidebar}
          >
            <IconLayoutSidebar />
          </Button>
          <Separator className="mr-2 h-4" orientation="vertical" />
          <Breadcrumb className="hidden sm:block">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
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
