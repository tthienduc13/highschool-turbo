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
                                    <CardTitle className="text-2xl flex items-center gap-2">
                                        <IconSchool className="h-5 w-5" />
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
                                            <Button className="h-8 w-8" size="icon" variant="ghost">
                                                <IconDotsVertical className="h-4 w-4" />
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
                                                <IconEdit className="h-4 w-4" />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="text-destructive gap-2"
                                                onClick={() => setOpenAlert(true)}
                                            >
                                                <IconTrash className="h-4 w-4" />
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
                                    <IconLibrary className="h-4 w-4 mt-1 text-muted-foreground shrink-0" />
                                    <p className="text-sm">{career.detail}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <IconBriefcase className="h-4 w-4 text-muted-foreground" />
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
                                    <IconCoin className="h-4 w-4 text-muted-foreground" />
                                    Salary Range (VND)
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-xs text-muted-foreground">Minimum</p>
                                        <p className="font-medium">
                                            {career.minSalary.toLocaleString("vi-VN")}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs text-muted-foreground">Average</p>
                                        <p className="font-medium">
                                            {career.averageSalary.toLocaleString("vi-VN")}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs text-muted-foreground">Maximum</p>
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
                                            <IconBook className="h-4 w-4" />
                                            Knowledge Required
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        {career.knowledge.map((section, index) => (
                                            <div key={index} className="space-y-2">
                                                <h4 className="font-medium">{section.title}</h4>
                                                <ul className="list-disc list-inside text-sm space-y-1">
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
                                            <IconListCheck className="h-4 w-4" />
                                            Skills
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        {career.skills.map((section, index) => (
                                            <div key={index} className="space-y-2">
                                                <h4 className="font-medium">{section.title}</h4>
                                                <ul className="list-disc list-inside text-sm space-y-1">
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
                                            <IconBrain className="h-4 w-4" />
                                            Abilities
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        {career.abilities.map((section, index) => (
                                            <div key={index} className="space-y-2">
                                                <h4 className="font-medium">{section.title}</h4>
                                                <ul className="list-disc list-inside text-sm space-y-1">
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
                                            <IconStretching className="h-4 w-4" />
                                            Personality Traits
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        {career.personality.map((section, index) => (
                                            <div key={index} className="space-y-2">
                                                <h4 className="font-medium">{section.title}</h4>
                                                <ul className="list-disc list-inside text-sm space-y-1">
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
                                            <IconDeviceLaptop className="h-4 w-4" />
                                            Technology & Tools
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        {career.technology.map((section, index) => (
                                            <div key={index} className="space-y-2">
                                                <h4 className="font-medium">{section.title}</h4>
                                                <ul className="list-disc list-inside text-sm space-y-1">
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
