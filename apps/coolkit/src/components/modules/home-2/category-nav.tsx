import {
  IconBook,
  IconCalculator,
  IconFlask,
  IconGlobe,
  IconLanguage,
  IconLighter,
} from "@tabler/icons-react";

export const CategoryNav = () => {
  const categories = [
    {
      icon: IconCalculator,
      label: "Math",
      color: "#19a5ff",
      bgColor: "#EBF8FF",
    },
    { icon: IconBook, label: "ELA", color: "#FF6B6B", bgColor: "#FFF5F5" },
    {
      icon: IconGlobe,
      label: "Social Studies",
      color: "#4ECDC4",
      bgColor: "#F0FFF4",
    },
    { icon: IconFlask, label: "Science", color: "#845EC2", bgColor: "#F8F0FC" },
    {
      icon: IconLanguage,
      label: "Languages",
      color: "#FF8C42",
      bgColor: "#FFF4E6",
    },
    {
      icon: IconLighter,
      label: "Trivia",
      color: "#FFB400",
      bgColor: "#FFFBEB",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {categories.map((category) => (
        <button
          key={category.label}
          className="animation-hover group relative bg-transparent shadow-none"
        >
          <div
            className="relative flex h-32 flex-col items-center justify-center gap-3 rounded-xl border-2 p-4"
            style={{
              backgroundColor: category.bgColor,
              borderColor: category.color,
              boxShadow: `inset 0 -8px ${category.color}99`,
            }}
          >
            <category.icon
              className="h-10 w-10"
              style={{ color: category.color }}
            />
            <span className="font-bold" style={{ color: category.color }}>
              {category.label}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};
