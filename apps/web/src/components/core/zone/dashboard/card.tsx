import { Card } from "@highschool/ui/components/ui/card";

export const CustomCard = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  props?: any;
}) => {
  return (
    <Card
      className="rounded-xl border border-gray-200 bg-white px-6 py-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
      {...props}
    >
      {children}
    </Card>
  );
};
