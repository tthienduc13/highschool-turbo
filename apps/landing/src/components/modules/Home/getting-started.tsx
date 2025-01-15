import Image from "next/image";

import {
  IconArrowRight,
  IconBrandFacebook,
  IconBrandFacebookFilled,
  IconCards,
  IconProgress,
} from "@tabler/icons-react";

import { TextAnimate } from "@/components/core/common/text-animation";

interface StartedItemProps {
  logo: React.ReactNode;
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
}

const StartedItems: StartedItemProps[] = [
  {
    logo: (
      <Image
        src={"/logo.svg"}
        alt="Mobile logo"
        width={28}
        height={28}
        priority
      />
    ),
    title: "Đăng nhập vào Highschool",
    description:
      " Tạo tài khoản miễn phí để đăng nhập vào hệ thông Highschool, khám phá những tính năng của chúng tôi",
    buttonLabel: " Bắt đầu ngay",
    href: "",
  },
  {
    logo: <IconProgress size={28} className="text-blue-600" />,
    title: "Nhập thông tin ",
    description:
      " Nhập đầy đủ thông tin như về trường, lớp, môn học bạn quan tâm để hệ thống gợi ý một cách chính xác nhất",
    buttonLabel: "Tìm hiểu thêm",
    href: "",
  },
  {
    logo: <IconCards size={28} className="text-blue-600" />,
    title: "Tạo bộ thẻ đầu tiên ",
    description:
      "Tạo bộ thẻ đầu tiên, khám phá những tính năng của thẻ ghi nhớ, giúp bạn tăng tối đa hiệu suất học tập",
    buttonLabel: " Đăng kí ngay",
    href: "",
  },
];

export const GettingStarted = () => {
  return (
    <div className="mx-auto mt-[12%] flex w-full max-w-[1440px] flex-col justify-center gap-12 px-4 py-6 lg:px-10">
      <div className="flex flex-col gap-3 text-left">
        <TextAnimate
          animation="slideUp"
          by="word"
          className="bg-gradient-radial to-primary from-gray-800 bg-clip-text text-2xl font-medium text-transparent"
        >
          Bắt đầu như thế nào?
        </TextAnimate>
        <TextAnimate
          animation="slideLeft"
          by="character"
          className="text-4xl font-bold md:text-5xl"
        >
          Kết quả của bạn sẽ được cải thiện từ hôm nay
        </TextAnimate>
      </div>
      <div className="grid w-full grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
        {StartedItems.map((item, index) => (
          <div
            data-aos="fade-up"
            data-aos-duration={(index + 1) * 500}
            key={index}
            className="flex h-full w-full flex-col gap-2"
          >
            {item.logo}
            <div>
              <h2 className="mb-[10px] text-xl font-medium">{item.title}</h2>
              <p className="text-muted-foreground mb-4 text-base">
                {item.description}
              </p>
              <button className="group flex items-center gap-2 text-base font-semibold text-blue-600">
                {item.buttonLabel}
                <IconArrowRight
                  className="transform transition-all duration-200 group-hover:translate-x-2"
                  size={20}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-primary mt-[8%] flex w-full flex-col items-center gap-5 rounded-2xl p-10 md:flex-row md:p-20">
        <div className="flex w-full flex-col gap-4 pr-5 md:w-3/4">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Tham gia cộng đồng Highschool ngay hôm nay
          </h2>
          <p className="text-xl font-medium text-white">
            HighSchool đã tạo ra tác động đáng kể đến hành trình học tập của
            nhiều học sinh. Nền tảng của chúng tôi nhận được phản hồi tích cực
            nhờ thiết kế thân thiện với người dùng.
          </p>
        </div>
        <div className="flex flex-1 justify-end">
          <button className="flex h-12 items-center gap-2 rounded-lg bg-white px-4 text-xl font-medium text-blue-600 hover:opacity-80">
            <IconBrandFacebookFilled className="mb-1" />
            @Highschool.vn
          </button>
        </div>
      </div>
    </div>
  );
};
