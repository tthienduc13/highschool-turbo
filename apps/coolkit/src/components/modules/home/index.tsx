import { CardQuestion } from "@/components/core/common/cards/card-question";
import {
  QuestionSetCard,
  RecommendCardQuestion,
} from "@/components/core/common/cards/recommend-card-question";

import { CategoryNav } from "./category-nav";
import { FeatureNav } from "./feature-nav";

const questionSets: QuestionSetCard[] = [
  {
    id: 1,
    title: "Math Challenge",
    creator: "Ms. Smith",
    questions: 20,
    players: 1234,
    image:
      "https://play-lh.googleusercontent.com/proxy/2tj1HTTkxfLUCHMYCMY7Ik_u9Dv-ctrQ7tteluo8MkL9bUzSFutbEcvkGroJxU6PTS84IHjfzCYjRsCflXcZ5k_CV2OAD2Al4i_fUCrb6cBVNvtB4TZhu97Z=s3840-w3840-h2160",
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
    image:
      "https://play-lh.googleusercontent.com/proxy/2tj1HTTkxfLUCHMYCMY7Ik_u9Dv-ctrQ7tteluo8MkL9bUzSFutbEcvkGroJxU6PTS84IHjfzCYjRsCflXcZ5k_CV2OAD2Al4i_fUCrb6cBVNvtB4TZhu97Z=s3840-w3840-h2160",
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
    image:
      "https://play-lh.googleusercontent.com/proxy/2tj1HTTkxfLUCHMYCMY7Ik_u9Dv-ctrQ7tteluo8MkL9bUzSFutbEcvkGroJxU6PTS84IHjfzCYjRsCflXcZ5k_CV2OAD2Al4i_fUCrb6cBVNvtB4TZhu97Z=s3840-w3840-h2160",
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
    image:
      "https://play-lh.googleusercontent.com/proxy/2tj1HTTkxfLUCHMYCMY7Ik_u9Dv-ctrQ7tteluo8MkL9bUzSFutbEcvkGroJxU6PTS84IHjfzCYjRsCflXcZ5k_CV2OAD2Al4i_fUCrb6cBVNvtB4TZhu97Z=s3840-w3840-h2160",
    category: "ELA",
    color: "#FF6B6B",
    bgColor: "#FFF5F5",
  },
  {
    id: 5,
    title: "Literature Test",
    creator: "Ms. Wilson",
    questions: 30,
    players: 567,
    image:
      "https://play-lh.googleusercontent.com/proxy/2tj1HTTkxfLUCHMYCMY7Ik_u9Dv-ctrQ7tteluo8MkL9bUzSFutbEcvkGroJxU6PTS84IHjfzCYjRsCflXcZ5k_CV2OAD2Al4i_fUCrb6cBVNvtB4TZhu97Z=s3840-w3840-h2160",
    category: "ELA",
    color: "#FF6B6B",
    bgColor: "#FFF5F5",
  },
  {
    id: 6,
    title: "Literature Test",
    creator: "Ms. Wilson",
    questions: 30,
    players: 567,
    image:
      "https://play-lh.googleusercontent.com/proxy/2tj1HTTkxfLUCHMYCMY7Ik_u9Dv-ctrQ7tteluo8MkL9bUzSFutbEcvkGroJxU6PTS84IHjfzCYjRsCflXcZ5k_CV2OAD2Al4i_fUCrb6cBVNvtB4TZhu97Z=s3840-w3840-h2160",
    category: "ELA",
    color: "#FF6B6B",
    bgColor: "#FFF5F5",
  },
];

function HomeModule() {
  return (
    <div className="container mx-auto px-6">
      <FeatureNav />
      <div className="mb-12">
        <h2 className="mb-2 text-3xl font-bold text-gray-800">Thể loại</h2>
        <p className="mb-6 text-gray-600">
          Lựa chọn thể loại game để khám phá những kiến thức mới
        </p>
        <CategoryNav />
      </div>
      <div className="mb-12">
        <h2 className="mb-2 text-3xl font-bold text-gray-800">
          Bộ câu hỏi phổ biến
        </h2>
        <p className="mb-6 text-gray-600">
          Khám phá những kiến thức trong các bộ câu hỏi
        </p>
        <CardQuestion />
      </div>
      <div className="mb-12">
        <h2 className="mb-2 text-3xl font-bold text-gray-800">
          Gợi ý bộ câu hỏi
        </h2>
        <p className="mb-6 text-gray-600">
          Khám phá những kiến thức trong các bộ câu hỏi
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {questionSets.map((set) => (
            <RecommendCardQuestion key={set.id} set={set} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeModule;
