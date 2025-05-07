"use client";

import { env } from "@highschool/env";
import { UniversityCategory } from "@highschool/interfaces";
import {
  useDeleteSavedUniversityMutation,
  useSaveUniversityMutation,
} from "@highschool/react-query/queries";
import { Badge } from "@highschool/ui/components/ui/badge";
import { Button } from "@highschool/ui/components/ui/button";
import { cn } from "@highschool/ui/lib/utils";
import { IconBookmark, IconMapPin, IconSchool } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface UniversityCardProps {
  university: UniversityCategory;
  savedButton?: boolean;
}

export default function UniversityCard({
  university,
  savedButton = false,
}: UniversityCardProps) {
  const [isUniSaved, setIsUniSaved] = useState(university.isSaved);
  const displayTags = university.tags.slice(0, 3);

  const truncatedDescription =
    university.description.length > 150
      ? university.description.substring(0, 150) + "..."
      : university.description;

  const apiSaveUniversity = useSaveUniversityMutation();
  const apiDeleteSavedUniversity = useDeleteSavedUniversityMutation();

  const handleSaveUniversity = () => {
    if (isUniSaved) {
      apiDeleteSavedUniversity.mutate(
        {
          universityId: university.id,
        },
        {
          onSuccess: (data) => {
            toast.success(data.message);
          },
        },
      );
    } else {
      apiSaveUniversity.mutate(
        {
          universityId: university.id,
        },
        {
          onSuccess: (data) => {
            toast.success(data.message);
          },
        },
      );
    }
    setIsUniSaved(!isUniSaved);
  };

  return (
    <div className="overflow-hidden rounded-lg border bg-white shadow-md transition-all  duration-300 hover:-translate-y-2 hover:shadow-lg">
      <div className="p-6">
        <div className="flex flex-row items-start justify-between gap-5">
          <div className="mb-4 flex items-center gap-4">
            <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">
              {university.logoUrl ? (
                <Image
                  alt={`${university.name} logo`}
                  className="object-cover"
                  height={64}
                  src={university.logoUrl || "/logo.svg"}
                  width={64}
                />
              ) : (
                <div className="text-2xl font-bold text-rose-600">
                  {university.uniCode}
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {university.name}
              </h3>
              <div className="flex items-center text-sm text-gray-500">
                <IconMapPin className="mr-1" size={14} />
                <span>{university.city}</span>
              </div>
            </div>
          </div>
          {savedButton && (
            <Button
              className="rounded-full"
              size={"icon"}
              variant="ghost"
              onClick={handleSaveUniversity}
            >
              <IconBookmark
                className={cn(
                  "!size-5 ",
                  isUniSaved && "fill-yellow-500 text-yellow-500",
                )}
              />
            </Button>
          )}
        </div>

        <p className="mb-4 text-sm text-gray-600">{truncatedDescription}</p>

        <div className="mb-4 flex flex-wrap gap-2">
          {displayTags.map((tag, index) => (
            <Badge
              key={index}
              className="border-rose-200 bg-rose-50 text-rose-700"
              variant="outline"
            >
              {tag}
            </Badge>
          ))}
          {university.tags.length > 3 && (
            <Badge
              className="border-gray-200 bg-gray-50 text-gray-700"
              variant="outline"
            >
              +{university.tags.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <IconSchool className="mr-1" size={16} />
            <span>{university.universityMajors.length ?? 0}+ ngành</span>
          </div>
          <Link
            className="text-sm font-medium text-rose-600 hover:text-rose-700"
            href={`${env.NEXT_PUBLIC_LANDING_URL}/dai-hoc/${university.id}`}
          >
            Xem chi tiết →
          </Link>
        </div>
      </div>
    </div>
  );
}
