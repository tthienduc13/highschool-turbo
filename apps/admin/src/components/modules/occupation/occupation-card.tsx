import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@highschool/ui/components/ui/accordion";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@highschool/ui/components/ui/dropdown-menu";
import { CareerInfo } from "@highschool/interfaces/occupation";
import { useDeleteOccupationMutation } from "@highschool/react-query/queries";
import {
  IconBook,
  IconBrain,
  IconBriefcase,
  IconCoin,
  IconDeviceLaptop,
  IconDotsVertical,
  IconEdit,
  IconLibrary,
  IconListCheck,
  IconSchool,
  IconStretching,
  IconTrash,
} from "@tabler/icons-react";

interface OccupationCardProps {
  careers?: CareerInfo[];
}

// const Alert = dynamic(
//     () =>
//         import("@/components/core/commons/modals/alert-modal").then(
//             (mod) => mod.AlertModal
//         ),
//     { ssr: false }
// );

export const OccupationCard = ({ careers }: OccupationCardProps) => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const { mutate: delteOccupation, isPending } = useDeleteOccupationMutation();
  const router = useRouter();

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {careers?.map((career) => (
        <div key={career.id}>
          {/* <Alert
                        isOpen={openAlert}
                        loading={isPending}
                        onClose={() => setOpenAlert(false)}
                        onConfirm={() => delteOccupation({ id: career.id! })}
                    /> */}
          <Card key={career.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <IconSchool className="size-5" />
                    {career.name}
                  </CardTitle>
                  <CardDescription>{career.description}</CardDescription>
                </div>
                <div className="flex">
                  <Badge
                    className="whitespace-nowrap"
                    variant={
                      career.chanceToFindJob >= 80 ? "default" : "secondary"
                    }
                  >
                    {career.chanceToFindJob}% Job Rate
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="size-8" size="icon" variant="ghost">
                        <IconDotsVertical className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="gap-2"
                        onClick={() =>
                          router.push(
                            `/career-mentor/occupation/${career.name}`,
                          )
                        }
                      >
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
                  <IconLibrary className="text-muted-foreground mt-1 size-4 shrink-0" />
                  <p className="text-sm">{career.detail}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <IconBriefcase className="text-muted-foreground size-4" />
                <span className="text-sm font-medium">Major Code:</span>
                <div className="flex gap-1">
                  {career.majorCodes.map((majorCode) => (
                    <Badge key={majorCode} variant="outline">
                      {majorCode}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Salary Information */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <IconCoin className="text-muted-foreground size-4" />
                  Salary Range (VND)
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-xs">Minimum</p>
                    <p className="font-medium">
                      {career.minSalary.toLocaleString("vi-VN")}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-xs">Average</p>
                    <p className="font-medium">
                      {career.averageSalary.toLocaleString("vi-VN")}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-xs">Maximum</p>
                    <p className="font-medium">
                      {career.maxSalary.toLocaleString("vi-VN")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Detailed Information Accordion */}
              <Accordion collapsible className="w-full" type="single">
                <AccordionItem value="knowledge">
                  <AccordionTrigger className="gap-2">
                    <div className="flex items-center gap-2 font-bold">
                      <IconBook className="size-4" />
                      Knowledge Required
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {career.knowledge.map((section, index) => (
                      <div key={index} className="space-y-2">
                        <h4 className="font-medium">{section.title}</h4>
                        <ul className="list-inside list-disc space-y-1 text-sm">
                          {section.bulletPoints.map((point, idx) => (
                            <li key={idx} className="text-muted-foreground">
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="skills">
                  <AccordionTrigger className="gap-2">
                    <div className="flex items-center gap-2 font-bold">
                      <IconListCheck className="size-4" />
                      Skills
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {career.skills.map((section, index) => (
                      <div key={index} className="space-y-2">
                        <h4 className="font-medium">{section.title}</h4>
                        <ul className="list-inside list-disc space-y-1 text-sm">
                          {section.bulletPoints.map((point, idx) => (
                            <li key={idx} className="text-muted-foreground">
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="abilities">
                  <AccordionTrigger className="gap-2">
                    <div className="flex items-center gap-2 font-bold">
                      <IconBrain className="size-4" />
                      Abilities
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {career.abilities.map((section, index) => (
                      <div key={index} className="space-y-2">
                        <h4 className="font-medium">{section.title}</h4>
                        <ul className="list-inside list-disc space-y-1 text-sm">
                          {section.bulletPoints.map((point, idx) => (
                            <li key={idx} className="text-muted-foreground">
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="personality">
                  <AccordionTrigger className="gap-2">
                    <div className="flex items-center gap-2 font-bold">
                      <IconStretching className="size-4" />
                      Personality Traits
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {career.personality.map((section, index) => (
                      <div key={index} className="space-y-2">
                        <h4 className="font-medium">{section.title}</h4>
                        <ul className="list-inside list-disc space-y-1 text-sm">
                          {section.bulletPoints.map((point, idx) => (
                            <li key={idx} className="text-muted-foreground">
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="technology">
                  <AccordionTrigger className="gap-2">
                    <div className="flex items-center gap-2 font-bold">
                      <IconDeviceLaptop className="size-4" />
                      Technology & Tools
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {career.technology.map((section, index) => (
                      <div key={index} className="space-y-2">
                        <h4 className="font-medium">{section.title}</h4>
                        <ul className="list-inside list-disc space-y-1 text-sm">
                          {section.bulletPoints.map((point, idx) => (
                            <li key={idx} className="text-muted-foreground">
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};
