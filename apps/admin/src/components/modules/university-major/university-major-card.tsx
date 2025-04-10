import {
  getAdmissionMethodLabel,
  UniversityMajor,
} from "@highschool/interfaces";
import { useDeleteUniversityMajorMutation } from "@highschool/react-query/queries";
import { Badge } from "@highschool/ui/components/ui/badge";
import { Button } from "@highschool/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@highschool/ui/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@highschool/ui/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@highschool/ui/components/ui/dropdown-menu";
import {
  IconBook,
  IconBrain,
  IconBriefcase,
  IconBulb,
  IconChevronDown,
  IconDotsVertical,
  IconEdit,
  IconSchool,
  IconTrash,
  IconUser,
  IconWallpaper,
} from "@tabler/icons-react";
import { useState } from "react";

// const Alert = dynamic(
//     () =>
//         import("@/components/core/commons/modals/alert-modal").then(
//             (mod) => mod.AlertModal
//         ),
//     { ssr: false }
// );

interface UniversityMajorCardProps {
  data?: UniversityMajor[];
}

export const UniversityMajorCard = ({ data }: UniversityMajorCardProps) => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const { mutate: deleteUniversityMajor, isPending } =
    useDeleteUniversityMajorMutation();
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data?.map((program) => (
        <div key={program.id}>
          <Card key={program.id} className="relative overflow-hidden">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <IconBriefcase className="size-5" />
                    {program.major?.name}
                  </CardTitle>
                  <CardDescription>
                    Code: {program.major?.majorCode} | {program.uniCode}
                  </CardDescription>
                </div>
                <div className="flex gap-1">
                  <Badge variant="secondary">{program.degreeLevel}</Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="size-8" size="icon" variant="ghost">
                        <IconDotsVertical className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <IconEdit className="size-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive gap-2"
                        onClick={() => setOpenAlert(true)}
                      >
                        <IconTrash className="size-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <IconBook className="text-muted-foreground mt-1 size-4 shrink-0" />
                  <p className="text-sm">{program.major?.description}</p>
                </div>
                <div className="flex items-start gap-2">
                  <IconBulb className="text-muted-foreground mt-1 size-4 shrink-0" />
                  <p className="text-sm">
                    <span className="font-medium">Skills:</span>{" "}
                    {program.major?.skillYouLearn}
                  </p>
                </div>
              </div>

              <Collapsible open={expandedCard === program.id}>
                <CollapsibleTrigger asChild>
                  <Button
                    className="w-full justify-between"
                    variant="ghost"
                    onClick={() =>
                      setExpandedCard(
                        expandedCard === program.id ? null : program.id!,
                      )
                    }
                  >
                    View Details
                    <IconChevronDown
                      className={`size-4 transition-transform ${expandedCard === program.id ? "rotate-180" : ""
                        }`}
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2">
                  <div className="space-y-4 pt-2">
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <IconUser className="text-muted-foreground size-4" />
                        <span className="text-sm font-medium">Category:</span>
                        <span className="text-sm">
                          {program.major?.majorCategory?.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <IconBrain className="text-muted-foreground size-4" />
                        <span className="text-sm font-medium">MBTI Types:</span>
                        <div className="flex gap-1">
                          {program.major?.majorCategory?.mbtiTypes.map(
                            (type) => (
                              <Badge key={type} variant="outline">
                                {type}
                              </Badge>
                            ),
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <IconWallpaper className="text-muted-foreground size-4" />
                        <span className="text-sm font-medium">
                          Holland Traits:
                        </span>
                        <div className="flex gap-1">
                          <Badge variant="outline">
                            {program.major?.majorCategory?.primaryHollandTrait}
                          </Badge>
                          <Badge variant="outline">
                            {
                              program.major?.majorCategory
                                ?.secondaryHollandTrait
                            }
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <IconSchool className="text-muted-foreground size-4" />
                        <span className="text-sm font-medium">
                          Admission Method:
                        </span>
                        <span className="text-sm">
                          {getAdmissionMethodLabel(
                            program.admissionMethods.toString(),
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <IconBook className="text-muted-foreground size-4" />
                        <span className="text-sm font-medium">Quota:</span>
                        <span className="text-sm">
                          {program.quota} students
                        </span>
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};
