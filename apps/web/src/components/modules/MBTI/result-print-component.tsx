import { useSession } from "next-auth/react";
import { forwardRef } from "react";
import Image from "next/image";
// import Watermark from "@uiw/react-watermark";
import { MBTIResult } from "@highschool/interfaces";
import { IconPointFilled } from "@tabler/icons-react";

interface ResultPrintProps {
  data: MBTIResult;
}

export const ResultPrintComponent = forwardRef<
  HTMLDivElement,
  ResultPrintProps
>(function ResultPrint(props, ref) {
  const { data } = props;
  const sections: (keyof Pick<MBTIResult, "advantages" | "disadvantages">)[] = [
    "advantages",
    "disadvantages",
  ];
  const session = useSession();

  return (
    // <Watermark ref={ref} content="Highschool" className="h-screen w-screen">
    <div
      ref={ref}
      className="mx-auto flex w-full max-w-5xl flex-col gap-y-10 p-10"
    >
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-2xl font-bold">Kết quả bài kiểm tra</h1>
        <div className="text-2xl font-medium">
          {session.data?.user.fullname}
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-y-2">
        <div className="flex flex-row items-center gap-x-4">
          <div className="relative size-[200px] overflow-hidden rounded-full">
            <Image
              fill
              alt={data.title}
              className="object-cover"
              sizes="200px"
              src={data.imageUrl}
            />
          </div>
          <h2 className="text-xl font-semibold">{data.title}</h2>
        </div>
        <div className="text-muted-foreground text-justify">
          {data.description}
        </div>
      </div>
      <div className="flex flex-row gap-8">
        {sections.map((type) => (
          <div key={type} className="flex w-full flex-col gap-y-5 md:px-4">
            <h3 className="scroll-m-20 text-start text-2xl font-semibold tracking-tight md:text-center">
              {type === "advantages" ? "Ưu điểm" : "Nhược điểm"}{" "}
            </h3>
            <ul className="flex flex-col gap-y-2">
              {data[type].map((item, index) => (
                <li key={index} className="flex flex-row items-start">
                  <IconPointFilled className="mr-2 mt-1 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
    // </Watermark>
  );
});
