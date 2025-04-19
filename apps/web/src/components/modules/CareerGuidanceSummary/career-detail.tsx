import { CareerPath } from "@highschool/interfaces";
import { useUpdateStudentMajorMutation } from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import { cn } from "@highschool/ui/lib/utils";
import {
  IconFolder,
  IconLoader2,
  IconPhone,
  IconUsers,
} from "@tabler/icons-react";
import { toast } from "sonner";

const formattedAmount = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

interface CareerDetailProps {
  career: CareerPath;
  selectedMajor: string;
  setSelectedMajor: React.Dispatch<React.SetStateAction<string | null>>;
}

export const CareerDetail = ({
  career,
  selectedMajor,
  setSelectedMajor,
}: CareerDetailProps) => {
  const apiUpdateUser = useUpdateStudentMajorMutation();

  const currentMajor = career.majors.find(
    (major) => major.majorCode === selectedMajor,
  );

  return (
    <div className="border-primary/10 animate-fadeIn mt-2 w-full rounded-lg border-2 bg-white p-6 shadow-lg">
      <div className="flex flex-col gap-6">
        <div>
          <div className="flex flex-row items-center justify-between">
            <h3 className="text-primary mb-2 text-2xl font-bold">
              {career.name}
            </h3>
            <Button
              disabled={apiUpdateUser.isPending}
              variant={"outline"}
              onClick={() =>
                apiUpdateUser.mutate(
                  { majorId: currentMajor?.id! },
                  {
                    onSuccess: (data) => {
                      toast.success(data.message);
                    },
                  },
                )
              }
            >
              {" "}
              {apiUpdateUser.isPending && (
                <IconLoader2 className="animate-spin" />
              )}
              Theo ngành này 🚀
            </Button>
          </div>
          <div className="mb-4 flex flex-wrap gap-3">
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
              {career.chanceToFindJob}% cơ hội việc làm
            </span>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              TB: {formattedAmount(career.averageSalary)}/tháng
            </span>
          </div>
          <p className="mb-4 text-sm text-gray-600">{career.description}</p>
          <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
            <p className="italic text-gray-700">{career.detail}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Knowledge Section */}
          <div className="rounded-lg bg-green-50 p-4">
            <h4 className="mb-3 flex items-center border-b border-green-200 pb-2 text-lg font-semibold text-green-700">
              <svg
                className="mr-2"
                fill="none"
                height="20"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              Kiến thức
            </h4>
            {career.knowledge.map((section, index) => (
              <div key={`knowledge-${index}`} className="mb-4">
                <h5 className="font-medium text-green-800">{section.title}</h5>
                <ul className="mt-1 list-disc pl-5 text-sm text-gray-700">
                  {section.bulletPoints.map((point, i) => (
                    <li key={`knowledge-point-${i}`} className="mt-1">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Skills Section */}
          <div className="rounded-lg bg-blue-50 p-4">
            <h4 className="mb-3 flex items-center border-b border-blue-200 pb-2 text-lg font-semibold text-blue-700">
              <svg
                className="mr-2"
                fill="none"
                height="20"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
              Kỹ năng
            </h4>
            {career.skills.map((section, index) => (
              <div key={`skills-${index}`} className="mb-4">
                <h5 className="font-medium text-blue-800">{section.title}</h5>
                <ul className="mt-1 list-disc pl-5 text-sm text-gray-700">
                  {section.bulletPoints.map((point, i) => (
                    <li key={`skills-point-${i}`} className="mt-1">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Abilities Section */}
          <div className="rounded-lg bg-purple-50 p-4">
            <h4 className="mb-3 flex items-center border-b border-purple-200 pb-2 text-lg font-semibold text-purple-700">
              <svg
                className="mr-2"
                fill="none"
                height="20"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
                <line x1="16" x2="2" y1="8" y2="22" />
                <line x1="17.5" x2="9" y1="15" y2="15" />
              </svg>
              Năng lực
            </h4>
            {career.abilities.map((section, index) => (
              <div key={`abilities-${index}`} className="mb-4">
                <h5 className="font-medium text-purple-800">{section.title}</h5>
                <ul className="mt-1 list-disc pl-5 text-sm text-gray-700">
                  {section.bulletPoints.map((point, i) => (
                    <li key={`abilities-point-${i}`} className="mt-1">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Technology Section */}
          <div className="rounded-lg bg-yellow-50 p-4">
            <h4 className="mb-3 flex items-center border-b border-yellow-200 pb-2 text-lg font-semibold text-yellow-700">
              <svg
                className="mr-2"
                fill="none"
                height="20"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect height="14" rx="2" ry="2" width="20" x="2" y="3" />
                <line x1="8" x2="16" y1="21" y2="21" />
                <line x1="12" x2="12" y1="17" y2="21" />
              </svg>
              Công nghệ
            </h4>
            {career.technology.map((section, index) => (
              <div key={`tech-${index}`} className="mb-4">
                <h5 className="font-medium text-yellow-800">{section.title}</h5>
                <ul className="mt-1 list-disc pl-5 text-sm text-gray-700">
                  {section.bulletPoints.map((point, i) => (
                    <li key={`tech-point-${i}`} className="mt-1">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Personality Section */}
        <div className="rounded-lg bg-orange-50 p-4">
          <h4 className="mb-3 flex items-center border-b border-orange-200 pb-2 text-lg font-semibold text-orange-700">
            <IconUsers className="mr-2" />
            Tính cách phù hợp
          </h4>
          {career.personality.map((section, index) => (
            <div key={`personality-${index}`} className="mb-4">
              <h5 className="font-medium text-orange-800">{section.title}</h5>
              <ul className="mt-1 list-disc pl-5 text-sm text-gray-700">
                {section.bulletPoints.map((point, i) => (
                  <li key={`personality-point-${i}`} className="mt-1">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Majors Section */}
        <div>
          <h4 className="mb-3 flex items-center border-b border-pink-200 pb-2 text-lg font-semibold text-pink-700">
            <IconFolder className="mr-2" />
            Các ngành học liên quan
          </h4>
          <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
            {career.majors.map((major, index) => {
              const isSelected = selectedMajor === major.majorCode;

              return (
                <button
                  key={index}
                  className={cn(
                    "rounded-lg border-2  bg-pink-50 p-4 transition-all duration-200 hover:shadow-md",
                    isSelected ? "border-pink-500" : "border-pink-100",
                  )}
                  onClick={() => {
                    setSelectedMajor(major.majorCode);
                  }}
                >
                  <h5 className="font-medium text-pink-800">{major.name}</h5>
                  <p className="mt-2 text-sm text-gray-700">
                    {major.description}
                  </p>
                  <div className="mt-3 border-t border-pink-100 pt-2">
                    <p className="text-xs text-gray-700">
                      <span className="font-medium">Kỹ năng học được:</span>{" "}
                      {major.skillYouLearn}
                    </p>
                    <p className="mt-1 flex items-center gap-2 text-xs text-gray-600">
                      <IconPhone size={14} />
                      <span className="font-medium">Danh mục:</span>{" "}
                      {major?.majorCategory?.name}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
