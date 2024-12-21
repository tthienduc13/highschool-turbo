import { ButtonKet } from "@/components/ui/button";
import { IconEdit, IconLibrary, IconPlayerPlay, IconUser, IconUsers } from "@tabler/icons-react";
import Image from "next/image";

const questionSets = [
    {
        id: 1,
        title: "Math Challenge",
        creator: "Ms. Smith",
        questions: 20,
        players: 1234,
        image: "https://play-lh.googleusercontent.com/proxy/2tj1HTTkxfLUCHMYCMY7Ik_u9Dv-ctrQ7tteluo8MkL9bUzSFutbEcvkGroJxU6PTS84IHjfzCYjRsCflXcZ5k_CV2OAD2Al4i_fUCrb6cBVNvtB4TZhu97Z=s3840-w3840-h2160",
        category: "Math",
        color: "#19a5ff",
        bgColor: "#EBF8FF",
    },
    {
        id: 2,
        title: "Science Quiz",
        creator: "Mr. Johnson",
        questions: 15,
        players: 856,
        image: "https://play-lh.googleusercontent.com/proxy/2tj1HTTkxfLUCHMYCMY7Ik_u9Dv-ctrQ7tteluo8MkL9bUzSFutbEcvkGroJxU6PTS84IHjfzCYjRsCflXcZ5k_CV2OAD2Al4i_fUCrb6cBVNvtB4TZhu97Z=s3840-w3840-h2160",
        category: "Science",
        color: "#845EC2",
        bgColor: "#F8F0FC",
    },
    {
        id: 3,
        title: "History Trivia",
        creator: "Mrs. Davis",
        questions: 25,
        players: 2341,
        image: "https://play-lh.googleusercontent.com/proxy/2tj1HTTkxfLUCHMYCMY7Ik_u9Dv-ctrQ7tteluo8MkL9bUzSFutbEcvkGroJxU6PTS84IHjfzCYjRsCflXcZ5k_CV2OAD2Al4i_fUCrb6cBVNvtB4TZhu97Z=s3840-w3840-h2160",
        category: "Social Studies",
        color: "#4ECDC4",
        bgColor: "#F0FFF4",
    },
    {
        id: 4,
        title: "Literature Test",
        creator: "Ms. Wilson",
        questions: 30,
        players: 567,
        image: "https://play-lh.googleusercontent.com/proxy/2tj1HTTkxfLUCHMYCMY7Ik_u9Dv-ctrQ7tteluo8MkL9bUzSFutbEcvkGroJxU6PTS84IHjfzCYjRsCflXcZ5k_CV2OAD2Al4i_fUCrb6cBVNvtB4TZhu97Z=s3840-w3840-h2160",
        category: "ELA",
        color: "#FF6B6B",
        bgColor: "#FFF5F5",
    },
]

export const CardQuestion = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {questionSets.map((set) => (
                <div
                    key={set.id}
                    className="group relative hover:scale-[1.02] transition-all duration-300"
                >
                    <div className="relative bg-white rounded-xl overflow-hidden border border-gray-200">
                        <div className="relative h-48">
                            <Image
                                src={set.image}
                                alt={set.title}
                                fill
                                className="object-cover"
                            />
                            <div
                                className="absolute inset-0"
                            />
                            <div
                                className="absolute top-4 right-4 px-3 py-1 rounded-xl text-sm font-bold shadow-inset-gray-shadow-sm"
                                style={{
                                    backgroundColor: set.color,
                                    color: 'white'
                                }}
                            >
                                {set.category}
                            </div>
                        </div>
                        <div
                            className="p-4 space-y-4"
                            style={{ backgroundColor: set.bgColor }}
                        >
                            <h3 className="text-xl font-bold text-gray-800 mb-1 text-center">{set.title}</h3>
                            <div className="flex items-center justify-around">
                                <div className="text-gray-600 text-sm flex flex-col items-center"><IconUser /> <span>{set.creator}</span></div>
                                <div className="text-gray-500 text-sm flex flex-col items-center"><IconLibrary /> <span>{set.questions} Questions</span></div>
                                <div className="text-gray-500 text-sm flex flex-col items-center"><IconUsers /> <span>{set.players.toLocaleString()} Join</span></div>
                            </div>
                        </div>
                        <div className="p-4 bg-white flex gap-2 shadow-inset-gray-shadow-md">
                            <ButtonKet
                                heightShadow="-6px"
                                backgroundColor={set.color}
                            >
                                <IconPlayerPlay className="w-5 h-5 scale-125" />
                                Tạo phòng
                            </ButtonKet>
                            <ButtonKet
                                heightShadow="-6px"
                                backgroundColor={set.color}
                            >
                                <IconEdit className="w-5 h-5 scale-125" />
                                Sửa câu hỏi
                            </ButtonKet>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

