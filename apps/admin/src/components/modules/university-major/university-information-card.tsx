import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@highschool/ui/components/ui/card";
import { University } from "@highschool/interfaces";
import {
  IconGlobe,
  IconMail,
  IconMapPin,
  IconPhone,
  IconSchool,
} from "@tabler/icons-react";
import { Badge } from "@highschool/ui/components/ui/badge";

export const UniversityInformationCard = ({
  university,
}: {
  university?: University;
}) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>University Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{university?.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {university?.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>University Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <IconMapPin className="text-muted-foreground size-4" />
              <span>{university?.city}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <IconMail className="text-muted-foreground size-4" />
              <a
                className="text-primary hover:underline"
                href={`mailto:${university?.contactEmail}`}
              >
                {university?.contactEmail}
              </a>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <IconPhone className="text-muted-foreground size-4" />
              <a
                className="hover:underline"
                href={`tel:${university?.contactPhone}`}
              >
                {university?.contactPhone}
              </a>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <IconGlobe className="text-muted-foreground size-4" />
              <a
                className="text-primary hover:underline"
                href={university?.websiteLink}
                rel="noopener noreferrer"
                target="_blank"
              >
                {university?.websiteLink}
              </a>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <IconSchool className="text-muted-foreground size-4" />
              <span className="">{university?.tags.at(0) ?? ""}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
