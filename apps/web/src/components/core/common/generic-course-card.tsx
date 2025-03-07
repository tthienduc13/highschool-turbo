import Link from "next/link";
import Image from "next/image";
import { IconArrowRight } from "@tabler/icons-react";

interface GenericCourseCardProps {
  title: string;
  href: string;
  image: string;
  description: string;
}

export const GenericCourseCard = ({
  title,
  href,
  image,
  description,
}: GenericCourseCardProps) => {
  return (
    <Link passHref className="flex" href={href}>
      <div className="flex size-full cursor-pointer flex-row rounded-lg border-2 border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 md:flex-col">
        <div className="relative h-[120px] w-full border-gray-200 dark:border-gray-700 md:w-full md:border-b-2">
          <Image
            fill
            alt={title}
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, 33vw"
            src={image}
          />
        </div>
        <div className="flex flex-col gap-1 p-5">
          <h2 className="text-lg font-bold">{title}</h2>
          <p className="line-clamp-2 h-10 text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
          <button className="group mt-1 w-fit p-0 text-blue-700 hover:text-blue-700 dark:text-blue-100 dark:hover:text-blue-100">
            <div className="flex flex-row gap-1 text-xs">
              <p>Xem ngay</p>
              <div className="ease-in-out transition-all duration-200 group-hover:-rotate-45">
                <IconArrowRight size={16} />
              </div>
            </div>
          </button>
        </div>
      </div>
    </Link>
  );
};
