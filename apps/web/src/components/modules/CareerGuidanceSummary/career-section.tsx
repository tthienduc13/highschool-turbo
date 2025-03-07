import { CareerPath } from "@highschool/interfaces";
import { useRecommendMajorQuery } from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import { Card, CardContent } from "@highschool/ui/components/ui/card";
import {
  IconArrowRight,
  IconCashBanknote,
  IconMinus,
  IconPlus,
} from "@tabler/icons-react";

const formattedAmount = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

interface CareerSectionProps {
  setSelectedMajor: React.Dispatch<React.SetStateAction<string | null>>;
  selectedMajor: string | null;
}

export const CareerSection = ({
  setSelectedMajor,
  selectedMajor,
}: CareerSectionProps) => {
  const { data, isLoading } = useRecommendMajorQuery({
    limit: 6,
  });

  if (isLoading) {
    return;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="group relative w-fit cursor-pointer text-3xl font-bold md:text-4xl">
          Hiểu nghề
          <div className="absolute bottom-0 left-0 h-1 w-1/2 bg-primary transition-all duration-200 group-hover:w-full" />
        </h1>
        <p className="font-medium text-muted-foreground">
          Dưới đây là những nghề gợi ý phù hợp với bạn, hãy chọn những chuyên
          ngành bạn cảm thấy phù hợp
        </p>
      </div>
      <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(300,1fr))] items-stretch gap-4">
        {data?.data?.map((career) => {
          return (
            <RecommendCard
              key={career.name}
              career={career}
              selectedMajor={selectedMajor ?? ""}
              setSelectedMajor={setSelectedMajor}
            />
          );
        })}
      </div>
    </div>
  );
};

interface RecommendCardProps {
  career: CareerPath;
  setSelectedMajor: React.Dispatch<React.SetStateAction<string | null>>;
  selectedMajor: string;
}

const RecommendCard = ({
  career,
  setSelectedMajor,
  selectedMajor,
}: RecommendCardProps) => {
  return (
    <Card className="flex h-full flex-col p-4 dark:bg-gray-800">
      <CardContent className="flex flex-1 flex-col p-0">
        <div className="flex flex-1 flex-col gap-2">
          <h2 className="text-lg font-bold">{career.name}</h2>
          <span className="w-fit rounded-full bg-green-500/20 px-1 text-xs">
            {career.chanceToFindJob}% cơ hội việc làm
          </span>
          <div className="flex flex-row items-center gap-2 text-xs">
            <IconCashBanknote size={16} />
            <span className="w-fit rounded-full bg-primary/20 px-1">
              {formattedAmount(career.minSalary)} -{" "}
              {formattedAmount(career.maxSalary)}
            </span>
          </div>
          <p className="text line-clamp-4 text-xs text-muted-foreground">
            {career.description}
          </p>
          <div className="flex flex-col gap-2">
            <p>Các ngành liên quan</p>
            <div className="flex flex-col gap-1 pl-2 text-sm">
              {career.majors.map((major) => (
                <div
                  key={major.majorCode}
                  className="flex flex-row items-center justify-between"
                >
                  <p>{major.name}</p>
                  <div className="cursor-pointer rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700">
                    {selectedMajor === major.majorCode ? (
                      <IconMinus
                        size={16}
                        onClick={() => setSelectedMajor(null)}
                      />
                    ) : (
                      <IconPlus
                        size={16}
                        onClick={() => setSelectedMajor(major.majorCode)}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-auto flex w-full justify-end">
            <Button
              className="group w-fit transition-all duration-300"
              size="sm"
            >
              Tìm hiểu thêm
              <IconArrowRight className="hidden group-hover:block" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
