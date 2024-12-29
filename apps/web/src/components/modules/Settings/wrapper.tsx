export interface SectionWrapperProps {
  heading: string;
  description: string | React.ReactNode;
  additional?: React.ReactNode;
  children: React.ReactNode;
}

export const Wrapper = ({
  heading,
  description,
  additional,
  children,
}: SectionWrapperProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr,auto] md:gap-16">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold">{heading}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>
        {additional}
      </div>
      {children}
    </div>
  );
};
