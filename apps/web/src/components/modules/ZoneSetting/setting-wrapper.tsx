export interface SettingsWrapperProps {
  heading: string;
  description: string | React.ReactNode;
  noOfLines?: number;
}

export const SettingsWrapper: React.FC<
  React.PropsWithChildren<SettingsWrapperProps>
> = ({ heading, description, children }) => {
  return (
    <div className="grid max-w-[4xl] grid-cols-1 gap-4 md:grid-cols-[1fr_2fr] md:gap-16">
      <div>
        <div className="flex h-full flex-col gap-1">
          <div className="flex h-6 items-center">
            <h2 className="text-xl font-semibold">{heading}</h2>
          </div>
          <div className="flex items-center pb-2">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {description}
            </p>
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};
