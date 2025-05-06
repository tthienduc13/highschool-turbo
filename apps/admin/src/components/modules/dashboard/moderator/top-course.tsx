import { useGetTopCourseOrFlashcardQuery } from "@highschool/react-query/queries";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@highschool/ui/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@highschool/ui/components/ui/select";
import { useState } from "react";

export const TopCourse = () => {
    const [type, setType] = useState<"flashcard" | "course">("course");

    const { data } = useGetTopCourseOrFlashcardQuery({
        type,
    });

    return (
        <Card>
            <CardHeader className="flex">
                <div>
                    <CardTitle>Top {type}s by Engagement</CardTitle>
                    <CardDescription>
                        Most active {type}s by student participation
                    </CardDescription>
                </div>
                <div>
                    <Select
                        value={type}
                        onValueChange={(value) => setType(value as "flashcard" | "course")}
                    >
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="flashcard">Flashcard</SelectItem>
                            <SelectItem value="course">Course</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {data?.map((course, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">{course.name}</p>
                                <p className="text-muted-foreground text-sm">
                                    {course.totalEnrollmentCount} active {type}s
                                </p>
                            </div>
                            <div className="flex items-center">
                                <span className="mr-2 font-bold">{course.completion}%</span>
                                <div className="bg-muted h-2 w-24 overflow-hidden rounded-full">
                                    <div
                                        className="bg-primary h-full"
                                        style={{ width: `${course.completion}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
