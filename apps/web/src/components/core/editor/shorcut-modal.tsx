import { Modal } from "@highschool/components/modal";
import { Separator } from "@highschool/ui/components/ui/separator";

export interface ShortcutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutModal = ({ isOpen, onClose }: ShortcutModalProps) => {
  return (
    <Modal withoutFooter isOpen={isOpen} onClose={onClose} title="Phím tắt">
      <div className="mt-4 flex flex-col gap-6">
        <Shortcut
          name="Thêm thẻ mới"
          label="Thêm thẻ bên dưới thẻ hiện tại"
          shortcut={
            <span className="flex gap-1">
              <Kbd>Ctrl</Kbd> + <Kbd>Shift</Kbd> + <Kbd>R</Kbd>
            </span>
          }
        />
        <Separator />
        <Shortcut
          name="Tới thẻ bên cạnh hoặc tiếp theo"
          shortcut={
            <span>
              <Kbd>Tab</Kbd>
            </span>
          }
        />
        <Separator />
        <Shortcut
          name="Di chuyển thẻ lên hoặc xuống"
          shortcut={
            <span className="flex gap-1">
              <Kbd>Alt</Kbd> + <Kbd>↑</Kbd> / <Kbd>↓</Kbd>
            </span>
          }
        />
      </div>
    </Modal>
  );
};

interface ShortcutProps {
  name: string;
  label?: string;
  shortcut: React.ReactNode;
}

const Shortcut: React.FC<ShortcutProps> = ({ name, label, shortcut }) => {
  return (
    <div className="flex w-full items-start justify-between">
      <div className="flex flex-col">
        <p className="text-lg font-bold md:text-xl">{name}</p>
        {label && <div className="text-muted-foreground text-sm">{label}</div>}
      </div>
      {shortcut}
    </div>
  );
};

interface KbdProps {
  children: React.ReactNode;
}
const Kbd = ({ children }: KbdProps) => {
  return (
    <div className="flex items-center justify-center rounded-md border border-x-[1px] border-b-[3px] border-t-[1px] bg-gray-100 px-[5px] text-xs font-bold dark:bg-gray-700">
      {children}
    </div>
  );
};
