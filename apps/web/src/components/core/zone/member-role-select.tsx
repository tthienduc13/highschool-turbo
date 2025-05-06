import { InviteMemberRole } from "@highschool/interfaces";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@highschool/ui/components/ui/select";

export interface MemberRoleSelectProps {
  value: InviteMemberRole;
  onChange: (role: InviteMemberRole) => void;
  //   myRole: MemberRole;
  isDisabled?: boolean;
}

const options: {
  label: string;
  value: InviteMemberRole;
  isDisabled?: boolean;
}[] = [
  {
    label: "Thành viên",
    value: InviteMemberRole.Student,
  },
  {
    label: "Mentor",
    value: InviteMemberRole.Teacher,
  },
];

export const MemberRoleSelect: React.FC<MemberRoleSelectProps> = ({
  value,
  onChange,
  isDisabled,
}) => {
  return (
    <Select disabled={isDisabled} value={value} onValueChange={onChange}>
      <SelectTrigger className="h-10 w-full border-gray-200 bg-white text-base focus-visible:ring-0 dark:border-gray-800/50 dark:bg-gray-800">
        <SelectValue className="text-base" placeholder="Chọn vai trò" />
      </SelectTrigger>
      <SelectContent className="border-gray-200 bg-gray-100 dark:border-gray-800/50 dark:bg-gray-800">
        {options.map((option) => (
          <SelectItem
            key={option.value}
            className="text-base"
            value={option.value}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
