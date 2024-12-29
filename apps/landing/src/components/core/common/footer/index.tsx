import Image from "next/image";
import Link from "next/link";

import { Separator } from "@highschool/ui/components/ui/separator";

import { IconArrowRight, IconCopyright } from "@tabler/icons-react";

interface FooterProps {
  title: string;
  subTitle: {
    title: string;
    href: string;
  }[];
}

export const Footer = () => {
  const items: FooterProps[] = [
    {
      title: "Danh mục",
      subTitle: [
        { title: "Trang chủ", href: "/" },
        { title: "Tài liệu", href: "/kho-tai-lieu" },
        { title: "Tin tức", href: "/tin-tuc" },
        { title: "Hướng nghiệp", href: "/huong-nghiep" },
      ],
    },
    {
      title: "Liên lạc",
      subTitle: [
        { title: "Facebook", href: "#" },
        { title: "Github", href: "#" },
        { title: "Linkedin", href: "#" },
      ],
    },
    {
      title: "Thông tin",
      subTitle: [
        { title: "Về chúng tôi", href: "/ve-chung-toi" },
        { title: "Các gói học tập", href: "/goi-hoc-tap" },
        { title: "Hỗ trợ", href: "/ho-tro" },
      ],
    },
  ];

  return (
    <footer className="relative mt-20 h-full w-full overflow-x-hidden">
      <div className="absolute top-0 -z-10 h-full w-[400%] max-w-[2200px] opacity-10 blur-[30px] lg:w-[150%]">
        <div className="relative h-full w-full">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0 pb-[31.25%]" />
          <div className="bg-custom-gradient absolute bottom-0 left-0 right-0 top-0 flex h-full w-full items-center justify-center overflow-hidden"></div>
        </div>
      </div>
      <div className="z-50 mx-auto flex w-full max-w-5xl flex-col gap-10 p-4 py-8 lg:p-10">
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <Link href={"/"}>
            <Image
              src={"/logo-with-text.svg"}
              alt="HIGHSCHOOLVN logo"
              width={380}
              height={100}
              className="h-[40px] w-fit md:w-full"
            />
          </Link>
          <Separator orientation="vertical" className="hidden h-5 md:flex" />
          <div className="flex flex-row items-center gap-x-2">
            <IconCopyright size={"18"} />
            <p className="text-base"> 2024, Highschool</p>
          </div>
        </div>
        <div className="flex w-full flex-row flex-wrap justify-between gap-10">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col gap-4">
              <div className="text-lg font-semibold uppercase text-blue-600">
                {item.title}
              </div>
              <div className="flex flex-col gap-y-3">
                {item.subTitle.map((sub, index) => (
                  <Link
                    key={index}
                    href={sub.href}
                    className="group flex items-center gap-2 text-base font-normal text-gray-700 hover:text-blue-600"
                  >
                    <IconArrowRight className="size-5 -translate-x-full text-black opacity-0 transition-all duration-300 ease-out hover:z-20 group-hover:translate-x-0 group-hover:text-blue-500 group-hover:opacity-100" />
                    <h1 className="z-10 -translate-x-6 cursor-pointer font-semibold text-black transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:text-blue-500 md:-translate-x-6 md:group-hover:translate-x-0 dark:text-white">
                      {sub.title}
                    </h1>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};
