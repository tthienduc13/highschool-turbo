import { MemberRole } from "@highschool/interfaces";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@highschool/ui/components/ui/select";

export interface MemberRoleSelectProps {
  value: MemberRole;
  onChange: (role: MemberRole) => void;
  //   myRole: MemberRole;
  isDisabled?: boolean;
}

const options: {
  label: string;
  value: MemberRole;
  isDisabled?: boolean;
}[] = [
  {
    label: "Thành viên",
    value: MemberRole.Student,
  },
  {
    label: "Quản trị viên",
    value: MemberRole.Teacher,
  },
  {
    label: "Chủ sở hữu",
    value: MemberRole.Admin,
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
