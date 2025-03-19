import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@highschool/ui/components/ui/card";

export const TopCourse = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Top Courses by Engagement</CardTitle>
                <CardDescription>
                    Most active courses by student participation
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {[
                        { name: "Advanced Mathematics", students: 1245, completion: 78 },
                        { name: "Introduction to Biology", students: 987, completion: 82 },
                        { name: "World History", students: 876, completion: 65 },
                        { name: "Physics 101", students: 754, completion: 71 },
                        { name: "English Literature", students: 698, completion: 69 },
                    ].map((course, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">{course.name}</p>
                                <p className="text-muted-foreground text-sm">
                                    {course.students} active students
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
