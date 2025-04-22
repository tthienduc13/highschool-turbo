import { UniversityList } from "./university-list";

import { Container } from "@/components/core/common/layouts/container";
import { TextAnimate } from "@/components/core/common/text-animation";

function UniversityCategoryModule() {
  return (
    <Container className="mt-10 flex w-full flex-col" maxWidth="7xl">
      <div className="flex flex-col items-center justify-center">
        <TextAnimate
          animation="fadeIn"
          by="word"
          className="bg-gradient-radial to-primary mb-4 from-gray-900 bg-clip-text text-5xl font-bold  tracking-tight text-transparent"
        >
          Danh bạ đại học
        </TextAnimate>
        <div className="mx-auto max-w-4xl ">
          <TextAnimate
            animation="fadeIn"
            by="word"
            className="text-center text-gray-500"
          >
            Khám phá toàn bộ các trường đại học tại Việt Nam, từ các trường công
            lập đến tư thục, từ các trường lớn đến nhỏ. Tìm hiểu về các chuyên
            ngành, chương trình đào tạo và thông tin tuyển sinh của từng trường.
          </TextAnimate>
        </div>
      </div>
      <UniversityList />
    </Container>
  );
}

export default UniversityCategoryModule;
