import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@highschool/ui/components/ui/card";
import { University } from "@highschool/interfaces";
import {
  IconMail,
  IconMapPin,
  IconPhone,
  IconWorld,
} from "@tabler/icons-react";

export const UniversityInformationCard = ({
  university,
}: {
  university?: University;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">University Information</CardTitle>
        <CardDescription>Contact details and location</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <IconMapPin className="text-muted-foreground size-4" />
            <span className="text-sm">{university?.city}</span>
          </div>
          <div className="flex items-center gap-2">
            <IconPhone className="text-muted-foreground size-4" />
            <span className="text-sm">{university?.contactPhone}</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <IconMail className="text-muted-foreground size-4" />
            <a
              className="text-sm hover:underline"
              href={`mailto:${university?.contactEmail}`}
            >
              {university?.contactEmail}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <IconWorld className="text-muted-foreground size-4" />
            <a
              className="text-sm hover:underline"
              href={university?.websiteLink}
              rel="noopener noreferrer"
              target="_blank"
            >
              {university?.websiteLink}
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
