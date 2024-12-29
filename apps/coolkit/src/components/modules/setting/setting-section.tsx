import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@highschool/ui/components/ui/card";

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

export function SettingsSection({ title, children }: SettingsSectionProps) {
  return (
    <Card className="shadow-inset-gray-shadow transition-all duration-300 hover:scale-[1.01]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
