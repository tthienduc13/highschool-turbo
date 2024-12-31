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
        <h1 className="group relative w-fit cursor-pointer text-3xl font-bold md:text-4xl">
          Hiểu nghề
          <div className="bg-primary absolute bottom-0 left-0 h-1 w-1/2 transition-all duration-200 group-hover:w-full" />
        </h1>
        <p className="text-muted-foreground font-medium">
          Dưới đây là những nghề gợi ý phù hợp với bạn
        </p>
      </div>
      <div className="group w-full">
        <Carousel
          opts={{
            dragFree: true,

            align: "start",
          }}
          className="w-full px-4"
        >
          <CarouselContent className="items-stretch">
            {data?.data?.map((career) => {
              return (
                <CarouselItem
                  key={career.name}
                  className="h-full items-stretch md:basis-1/2 lg:basis-1/3"
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
    <Card className="h-full p-4">
      <CardContent className="h-full p-0">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold">{career.name}</h2>
          <span className="w-fit rounded-full bg-green-500/20 px-1 text-xs">
            {career.chanceToFindJob}% cơ hội việc làm
          </span>
          <div className="flex flex-row items-center gap-2 text-xs">
            <IconCashBanknote size={16} />
            <span className="bg-primary/20 w-fit rounded-full px-1">
              {formattedAmount(career.minSalary)} -{" "}
              {formattedAmount(career.maxSalary)}
            </span>
          </div>
          <p className="text text-muted-foreground text-xs">
            {career.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
