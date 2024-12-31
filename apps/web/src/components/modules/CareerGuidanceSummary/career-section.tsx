import { CareerPath } from "@highschool/interfaces";
import { useRecommendMajorQuery } from "@highschool/react-query/queries";
import { Card, CardContent } from "@highschool/ui/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@highschool/ui/components/ui/carousel";
import { IconCashBanknote } from "@tabler/icons-react";

const formattedAmount = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

export const CareerSection = () => {
  const { data, isLoading } = useRecommendMajorQuery({
    isHardCode: true,
    limit: 5,
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="md:text-4xl group text-3xl font-bold relative w-fit cursor-pointer ">
          Hiểu nghề
          <div className="absolute bottom-0 left-0 h-1 bg-primary w-1/2 group-hover:w-full transition-all duration-200 " />
        </h1>
        <p className="text-muted-foreground font-medium">
          Dưới đây là những nghề gợi ý phù hợp với bạn
        </p>
      </div>
      <div className="w-full group">
        <Carousel
          opts={{
            dragFree: true,

            align: "start",
          }}
          className="w-full px-4 "
        >
          <CarouselContent className="items-stretch ">
            {data?.data?.map((career) => {
              return (
                <CarouselItem
                  key={career.name}
                  className="md:basis-1/2 lg:basis-1/3 h-full items-stretch"
                >
                  <RecommendCard key={career.name} career={career} />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious
            style={{
              zIndex: 10000,
            }}
            className="left-0 hidden group-hover:flex"
          />
          <CarouselNext
            style={{
              zIndex: 10000,
            }}
            className="right-0 hidden group-hover:flex"
          />
        </Carousel>
      </div>
    </div>
  );
};

interface RecommendCardProps {
  career: CareerPath;
}

const RecommendCard = ({ career }: RecommendCardProps) => {
  return (
    <Card className="p-4 h-full">
      <CardContent className="p-0 h-full">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold">{career.name}</h2>
          <span className="rounded-full bg-green-500/20 text-xs px-1 w-fit ">
            {career.chanceToFindJob}% cơ hội việc làm
          </span>
          <div className="flex flex-row items-center gap-2 text-xs">
            <IconCashBanknote size={16} />
            <span className="rounded-full bg-primary/20 w-fit px-1 ">
              {formattedAmount(career.minSalary)} -{" "}
              {formattedAmount(career.maxSalary)}
            </span>
          </div>
          <p className="text-xs text text-muted-foreground">
            {career.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
