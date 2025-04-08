import { Button } from "@highschool/ui/components/ui/button";
import { useRouter } from "next/navigation";

export function SubjectPrimaryButton() {
  const router = useRouter();

  return (
    <div className="flex gap-2">
      <Button
        className="space-x-1"
        onClick={() => {
          router.push("/subjects/create");
        }}
      >
        Create new
      </Button>
    </div>
  );
}
