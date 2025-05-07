"use client";

import React, { useEffect, useState } from "react";
import {
  IconLogout,
  IconSettings,
  IconTrash,
  IconUpload,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { Button } from "@highschool/ui/components/ui/button";
import { Separator } from "@highschool/ui/components/ui/separator";
import { Input } from "@highschool/ui/components/ui/input";
import { Textarea } from "@highschool/ui/components/ui/textarea";

import { SettingsWrapper } from "./setting-wrapper";
import { LeaveZoneModal } from "./leave-zone-modal";
import { DeleteZoneModal } from "./delete-zone-modal";

import ZoneLayout from "@/components/core/layouts/zone-layout";
import { Container } from "@/components/core/layouts/container";
import { useZone } from "@/hooks/use-zone";
import { useMe } from "@/hooks/use-me";
import { Loading } from "@/components/core/common/loading";
import { ZoneLogo } from "@/components/core/zone/zone-logo";
import { useLogoUpload } from "@/hooks/use-file-upload";

function ZoneSettingModule() {
  const { data: session } = useSession();
  const me = useMe();
  const { data: zone, isLoading: zoneLoading } = useZone();

  const { file, onInputFile, uploadLogo } = useLogoUpload({});

  const isAuthor = zone?.createdBy === me?.userId;

  const [mounted, setMounted] = useState(false);
  const [leaveOpen, setLeaveOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [zoneName, setZoneName] = useState("");
  const [zoneDescription, setZoneDescription] = useState("");

  const [imageSrc, setImageSrc] = useState<string | null | undefined>(
    undefined,
  );
  const imageLoaded = imageSrc !== undefined;

  useEffect(() => {
    if (file) setImageSrc(file as string);
  }, [file]);

  useEffect(() => {
    if (zone && !mounted) {
      setMounted(true);
      setZoneName(zone.name);
      setZoneDescription(zone.description ?? "");
      setImageSrc(zone.logoUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zone]);

  if (zoneLoading) {
    return (
      <ZoneLayout>
        <Container maxWidth="6xl">
          <Loading />
        </Container>
      </ZoneLayout>
    );
  }

  return (
    <>
      <LeaveZoneModal isOpen={leaveOpen} onClose={() => setLeaveOpen(false)} />
      <DeleteZoneModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
      />
      <ZoneLayout>
        <Container maxWidth="6xl">
          <div className="flex flex-col gap-8">
            <div className="flex h-10 flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-3">
                <IconSettings />
                <h1 className="text-3xl font-bold">Cài đặt</h1>
              </div>
              {isAuthor && (
                <div className="flex flex-row items-center gap-2">
                  <Button
                    className="text-primary !text-base"
                    size={"lg"}
                    variant={"ghost"}
                    onClick={() => {
                      setZoneName(zone!.name);
                      setZoneDescription(zone!.description ?? "");
                      setImageSrc(zone!.logoUrl);
                    }}
                  >
                    Đặt lại
                  </Button>
                  <Button
                    className="!text-base"
                    size={"lg"}
                    // onClick={() => {
                    //   update.mutate({
                    //     id: org!.id,
                    //     name: orgName,
                    //     clearLogo: imageSrc === null,
                    //   });
                    // }}
                  >
                    Lưu thay đổi
                  </Button>
                </div>
              )}
            </div>
            <Separator />
            <SettingsWrapper
              description="Thông tin chung vể zone này"
              heading="Thông tin chung"
            >
              <div className="flex flex-col gap-5 pb-0.5">
                <div className="flex flex-row items-center gap-4">
                  <div className="bg-background flex size-16 min-w-16 items-center justify-center overflow-hidden rounded-full shadow-lg">
                    <ZoneLogo
                      height={64}
                      local={!!file}
                      url={imageSrc}
                      width={64}
                    />
                  </div>
                  {isAuthor && (
                    <div className="flex flex-col gap-1">
                      <input
                        accept="image/*"
                        id="upload-logo-input"
                        style={{ position: "absolute", display: "none" }}
                        type="file"
                        onInput={onInputFile}
                      />
                      <div className="flex h-[42px] items-center">
                        <p className="max-w-xs text-sm text-gray-600 dark:text-gray-400">
                          Chung tôi khuyên bạn nên sử dụng ảnh có kích thước
                          512x512px
                        </p>
                      </div>
                      <div className="flex flex-row items-center gap-2">
                        <label htmlFor="upload-logo-input">
                          <Button
                            className="cursor-pointer "
                            type="button"
                            variant={"outline"}
                          >
                            <IconUpload size={16} />
                            Tải lên ảnh
                          </Button>
                        </label>
                        <Button
                          disabled={!zone?.logoUrl || !file || !isAuthor}
                          variant={"outline"}
                          onClick={() => setImageSrc(null)}
                        >
                          Xoá
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-gray-500">Tên</p>
                  <Input
                    className="h-10 w-full rounded-lg border border-gray-200 bg-white !text-lg shadow-sm dark:border-gray-700 dark:bg-gray-900"
                    disabled={!isAuthor}
                    value={zoneName}
                    onChange={(e) => setZoneName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-gray-500">Mô tả</p>
                  <Textarea
                    className=" w-full rounded-lg border border-gray-200 bg-white !text-lg shadow-sm dark:border-gray-700 dark:bg-gray-900"
                    disabled={!isAuthor}
                    maxLength={255}
                    value={zoneDescription}
                    onChange={(e) => setZoneDescription(e.target.value)}
                  />
                </div>
              </div>
            </SettingsWrapper>
            <Separator />
            <SettingsWrapper
              description="Hành động ở đây không thể hoàn tác"
              heading="Khu vực nguy hiểm"
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-row gap-3">
                  {!isAuthor && (
                    <Button
                      variant="outline"
                      onClick={() => setLeaveOpen(true)}
                    >
                      <IconLogout size={18} />
                      Rời {zone?.name || "Zone"}
                    </Button>
                  )}
                  {isAuthor && (
                    <Button
                      variant="destructive"
                      onClick={() => setDeleteOpen(true)}
                    >
                      <IconTrash size={18} />
                      Xoá {zone?.name || "Zone"}
                    </Button>
                  )}
                </div>
              </div>
            </SettingsWrapper>
          </div>
        </Container>
      </ZoneLayout>
    </>
  );
}

export default ZoneSettingModule;
