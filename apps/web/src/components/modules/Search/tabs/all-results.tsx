"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export const AllResult = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <div className="flex flex-col">
      <Section title="Thẻ ghi nhớ" url={`/search?q=${query}&type=flashcard`}>
        <div>all</div>
      </Section>
    </div>
  );
};

interface SectionProps {
  children: React.ReactNode;
  title: string;
  url: string;
}

export const Section = ({ children, title, url }: SectionProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <h2 className="font-semibold flex-1">{title}</h2>
        <Link
          className="text-blue-700 font-semibold hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
          href={url}
        >
          Xem thêm
        </Link>
      </div>
      {children}
    </div>
  );
};
