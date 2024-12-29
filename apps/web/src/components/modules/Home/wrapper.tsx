interface WrapperProps {
  title: string;
  children: React.ReactNode;
}

export const Wrapper = ({ title, children }: WrapperProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="pl-4 text-2xl font-semibold md:pl-0">{title}</h2>
      {children}
    </div>
  );
};
