"use client";

export default function FeedBack() {
  const cards = [
    {
      title: "Xuân Thành",
      description:
        "HighSchool là một nền tảng học tập trực tuyến tuyệt vời cho học sinh trung học. Đặc biệt, tính năng trợ giúp thông minh giúp tôi giải quyết mọi thắc mắc nhanh chóng và hiệu quả.",
      color: "bg-green-500",
      rotate: "rotate-2 sm:rotate-6",
    },
    {
      title: "Thiện Đức",
      description:
        "HighSchool thực sự là một nguồn tài nguyên học tập đa dạng và phong phú cho học sinh trung học. Hệ thống lộ trình học tập thông minh giúp tôi theo dõi được quá trình học và điều chỉnh cách học phù hợp với bản thân.",
      color: "bg-red-400",
      rotate: "",
    },
    {
      title: "Huy Trần",
      description:
        "Tôi rất hài lòng với trải nghiệm học tập tại HighSchool. Từ việc quản lý kiến thức, theo dõi lộ trình học đến hệ thống trợ giúp thông minh, mọi thứ đều được thiết kế để giúp học sinh trung học đạt kết quả tốt nhất. ",
      color: "bg-orange-400",
      rotate: "-rotate-2 sm:-rotate-6",
    },
    {
      title: "Nguyễn Thanh",
      description:
        "Ứng dụng này là một người bạn đồng hành đáng tin cậy trên hành trình học tập của tôi. Tôi đặc biệt yêu thích cách mà HighSchool cung cấp nội dung phù hợp với nhu cầu học tập của mỗi học sinh.",
      color: "bg-purple-400",
      rotate: "rotate-3 sm:rotate-6",
    },
    {
      title: "Sơn Hoàng Lê",
      description:
        "HighSchool không chỉ là nơi để học tập mà còn là nơi truyền cảm hứng. Các bài giảng sáng tạo và hệ thống hỗ trợ tuyệt vời đã giúp tôi tiến bộ nhanh chóng trong các môn học khó.",
      color: "bg-pink-400",
      rotate: "-rotate-3 sm:-rotate-6",
    },
  ];

  return (
    <main className="relative mt-[60px] h-screen overflow-y-scroll bg-black md:mt-[100px]">
      <div className="wrapper">
        <section className="sticky top-0 grid min-h-screen w-full place-content-center bg-slate-950 text-white">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

          <h1 className="px-4 text-center text-3xl font-semibold leading-[150%] tracking-tight sm:px-8 sm:text-5xl 2xl:text-7xl">
            Từ những học sinh trải nghiệm <br className="hidden sm:inline" />
            HighSchool và thấy sự khác biệt! 👇
          </h1>
        </section>
      </div>

      <section className="mx-auto w-full bg-slate-950 text-white">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="flex flex-col justify-between px-4 sm:px-8 lg:flex-row lg:px-16">
            <div className="mb-16 grid gap-8 lg:mb-0 lg:gap-2">
              {cards.map((card, index) => (
                <figure
                  key={index}
                  className="sticky top-0 grid min-h-screen place-content-center"
                >
                  <article
                    className={`${card.color} ${card.rotate} grid h-auto w-full place-content-center gap-4 rounded-lg p-4 transition-all duration-300 ease-in-out hover:scale-105 sm:h-72 sm:w-[30rem]`}
                  >
                    <h1 className="text-xl font-semibold sm:text-2xl">
                      {card.title}
                    </h1>
                    <p className="text-sm sm:text-base">{card.description}</p>
                  </article>
                </figure>
              ))}
            </div>
            <div className="hidden h-screen place-content-center lg:sticky lg:top-0 lg:grid">
              <h1 className="px-4 text-center text-2xl font-medium leading-[120%] tracking-tight sm:px-8 sm:text-4xl">
                Những ý kiến <br /> từ các học sinh😎
              </h1>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
