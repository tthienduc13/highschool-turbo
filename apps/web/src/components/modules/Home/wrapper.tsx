interface WrapperProps {
  title: string;
  children: React.ReactNode;
}

export const Wrapper = ({ title, children }: WrapperProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-semibold md:text-2xl">{title}</h2>
      {children}
    </div>
  );
};
