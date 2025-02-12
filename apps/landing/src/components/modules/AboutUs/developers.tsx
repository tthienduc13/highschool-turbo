"use client";

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function Developers() {
  const testimonials = [
    {
      quote:
        "Chúng tôi đã tạo ra ứng dụng này với mong muốn giúp học sinh học tập hiệu quả hơn, dễ dàng tiếp cận kiến thức và phát triển bản thân mỗi ngày.",
      name: "Nguyễn Lê Thiện Đức",
      designation: "Nhà phát triển",
      src: "https://res.cloudinary.com/dhdyel6be/image/upload/v1739367764/HighSchool/avatars/contributor/jqbxxbxxdly8lwmhosel.jpg",
    },
    {
      quote:
        "Mỗi tính năng trong ứng dụng đều được thiết kế cẩn thận để mang lại trải nghiệm học tập thú vị và giúp các bạn học sinh chinh phục mọi thử thách.",
      name: "Nguyễn Xuân Thành",
      designation: "Nhà phát triển",
      src: "https://res.cloudinary.com/dhdyel6be/image/upload/v1739368433/HighSchool/avatars/contributor/tpwe4nqfhkdqbb9i6f6c.jpg",
    },
    {
      quote:
        "Chúng tôi tin rằng việc học không chỉ là tiếp thu kiến thức mà còn là hành trình khám phá. Ứng dụng này là người bạn đồng hành tuyệt vời cho mọi học sinh.",
      name: "Tống Trần Lê Huy",
      designation: "Nhà phát triển",
      src: "https://res.cloudinary.com/dhdyel6be/image/upload/v1739368326/HighSchool/avatars/contributor/bske0fcoptwgaeac9mbp.jpg",
    },
    {
      quote:
        "Không có gì tuyệt vời hơn khi thấy học sinh sử dụng sản phẩm của chúng tôi để phát triển kỹ năng, đạt được mục tiêu và thành công trong học tập.",
      name: "Nguyễn Duy Thanh",
      designation: "Nhà phát triển",
      src: "https://res.cloudinary.com/dhdyel6be/image/upload/v1739367874/HighSchool/avatars/contributor/eqr6veunj0kya5mxuepn.jpg",
    },
    {
      quote:
        "Chúng tôi không chỉ tạo ra một ứng dụng, mà còn xây dựng một cộng đồng học tập đầy cảm hứng, nơi mọi học sinh đều có thể phát huy tối đa tiềm năng của mình.",
      name: "Lê Hoàng Sơn",
      designation: "Nhà phát triển",
      src: "https://res.cloudinary.com/dhdyel6be/image/upload/v1739367762/HighSchool/avatars/contributor/xhovjg3i66djkvcof4ww.jpg",
    },
  ];

  return (
    <div className="flex flex-col">
      <h2 className="text-center text-3xl font-semibold">
        Gặp gỡ các nhà phát triển
      </h2>
      <AnimatedTestimonials testimonials={testimonials} />
    </div>
  );
}
