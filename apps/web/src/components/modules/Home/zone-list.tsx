"use client";

import { ZonePreview } from "@highschool/interfaces";
import Link from "next/link";
import { cn } from "@highschool/ui/lib/utils";
import { Avatar, AvatarImage } from "@highschool/ui/components/ui/avatar";
import { IconHistory } from "@tabler/icons-react";

import { Wrapper } from "./wrapper";

interface ZoneListProps {
  data: ZonePreview[];
}

export const ZoneList = ({ data }: ZoneListProps) => {
  if (!data) {
    return;
  }

  return (
    <Wrapper title="Zone của bạn">
      <div className="group w-full py-2">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(256px,1fr))] items-stretch gap-4">
          {data.map((zone) => (
            <ZoneCard key={zone.id} data={zone} />
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

interface ZoneCardProps {
  data: ZonePreview;
}

export const ZoneCard = ({ data }: ZoneCardProps) => {
  const isZoneActive = data.status?.toLowerCase() === "available";

  return (
    <Link passHref href={`/zone/${data.id}`}>
      <div
        className="hover:border-b-primary cursor-pointer overflow-hidden rounded-lg border-2 border-gray-200 bg-white  shadow-md transition-all duration-200 ease-in-out hover:-translate-y-2 dark:border-gray-700 dark:bg-gray-800"
        // style={{ zIndex: menuOpen ? 30 : 25 }}
      >
        {/* <Image
          priority
          alt={data.name}
          className="h-[100px] w-full object-cover"
          height={100}
          quality={100}
          src={data.bannerUrl ?? ""}
          width={100}
        /> */}
        <div className="flex h-full flex-col justify-center gap-4 p-5">
          <div className={cn("flex gap-2", "flex-col")}>
            <div className="flex w-full items-center justify-between gap-2">
              <div className="flex flex-1 flex-row items-center gap-2">
                <Avatar>
                  <AvatarImage
                    alt={data.name}
                    src={data.logoUrl ?? "/logo.svg"}
                  />
                </Avatar>
                <h2 className="line-clamp-1 overflow-hidden text-ellipsis text-lg font-bold">
                  {data.name}
                </h2>
              </div>
              <div
                className={cn(
                  "inline-flex rounded-sm px-2 text-xs items-center py-0.5",
                  isZoneActive ? "bg-emerald-500/40 " : "bg-destructive/40",
                )}
              >
                {isZoneActive ? "Hoạt động" : "Bị cấm"}
              </div>
            </div>
            <div className="flex flex-row items-center justify-between">
              <div className="line-clamp-2 flex min-h-10 flex-row items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                {data.description}
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="text-muted-foreground flex flex-row items-center gap-1 text-sm">
              <IconHistory size={16} />
              <p>{new Date(data.createdAt).toLocaleDateString()}</p>
            </div>
            <div
              className={cn(
                "inline-flex rounded-sm px-2 text-xs items-center py-0.5",
                data.isOwner ? "bg-[#E9D8FE] " : "bg-[#B0CAFF]",
              )}
            >
              {data.isOwner ? "Chủ sở hữu" : "Thành viên"}
            </div>
          </div>
          {/* <div className="flex w-full flex-row justify-between">
            {!userLoading && (
              <div className="flex w-full flex-row items-center gap-2">
                {!bottom ? (
                  <>
                    {" "}
                    <Avatar className="size-6">
                      <AvatarImage
                        alt={user.fullname ?? "Người dùng Highschool"}
                        src={user.image ?? "/logo.svg"}
                      />
                    </Avatar>
                    <div className="flex flex-row items-center gap-1">
                      <div className="text-sm font-semibold">
                        {user.fullname ?? "Highschool"}
                      </div>
                      {verified && (
                        <IconDiscountCheck aria-label="Verified" size={18} />
                      )}
                    </div>
                  </>
                ) : (
                  bottom
                )}
              </div>
            )}
            {removable ? (
              <DropdownMenu
                open={menuOpen}
                onOpenChange={() => setMenuOpen(false)}
              >
                <DropdownMenuTrigger asChild>
                  <Button
                    className="rounded-full"
                    size={"icon"}
                    variant={"ghost"}
                    onClick={(e) => {
                      e.preventDefault();
                      setMenuOpen(true);
                    }}
                  >
                    <IconDotsVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      onRemove();
                      setMenuOpen(false);
                    }}
                  >
                    <IconTrash />
                    Xoá
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}
          </div> */}
        </div>
      </div>
    </Link>
  );
};
