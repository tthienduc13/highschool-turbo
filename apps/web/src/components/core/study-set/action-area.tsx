import { menuEventChannel } from "@/events/menu";
import { Button } from "@highschool/ui/components/ui/button";
import {
    IconLoader2,
    IconPlus,
    IconPrinter,
    IconShare,
    IconTableExport,
    TablerIcon,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { Hint } from "../common/hint";
import { useState } from "react";
import dynamic from "next/dynamic";

const AddToFolderModal = dynamic(
    () => import("./add-to-folder-modal").then((mod) => mod.AddToFolderModal),
    {
        ssr: false,
    }
);

export const ActionArea = () => {
    const [addToFolder, setAddToFolder] = useState(false);
    const [share, setShare] = useState(false);
    const [shouldPrint, setShouldPrint] = useState(false);
    const [exportOpen, setExportOpen] = useState(false);

    // const handlePrint = useReactToPrint({
    //     content: () => printRef.current,
    //     onAfterPrint: () => {
    //         setShouldPrint(false);
    //     },
    // });
    return (
        <>
            <AddToFolderModal
                isOpen={addToFolder}
                onClose={async () => {
                    setAddToFolder(false);
                }}
            />
            <div className="border rounded-lg overflow-hidden flex flex-row w-fit divide-x-[1px]">
                <ActionButton
                    label="Thêm vào thư mục"
                    icon={IconPlus}
                    onClick={() => setAddToFolder(true)}
                    unauthedMessage="Tạo tài khoản miễn phí để tạo thư mục và lưu trữ bộ thẻ ghi nhớ"
                />
                <ActionButton
                    label="Chia sẻ"
                    icon={IconShare}
                    onClick={() => setShare(true)}
                />
                <ActionButton
                    label="Print"
                    icon={IconPrinter}
                    isLoading={shouldPrint}
                    onClick={() => {
                        setShouldPrint(true);
                        requestAnimationFrame(() => {
                            // handlePrint();
                        });
                    }}
                />
                <ActionButton
                    label="Xuất ra"
                    icon={IconTableExport}
                    onClick={() => setExportOpen(true)}
                />
            </div>
        </>
    );
};

interface ActionButtonProps {
    label: string;
    icon: TablerIcon;
    onClick?: () => void;
    isLoading?: boolean;
    unauthedMessage?: string;
    unauthedCallbackUrl?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
    label,
    icon,
    onClick,
    isLoading,
    unauthedMessage,
    unauthedCallbackUrl,
}) => {
    const authed = useSession().status == "authenticated";
    const Icon = icon;

    const unauthedHandler = () => {
        menuEventChannel.emit("openSignup", {
            message: unauthedMessage,
            callbackUrl: unauthedCallbackUrl,
        });
    };

    return (
        <Hint label={label} side="bottom">
            <Button
                aria-label={label}
                variant={"ghost"}
                size={"icon"}
                className="rounded-none"
                disabled={isLoading}
                onClick={authed || !unauthedMessage ? onClick : unauthedHandler}
            >
                {isLoading ? (
                    <IconLoader2 className="animate-spin" />
                ) : (
                    <Icon className="!size-[18px]" />
                )}
            </Button>
        </Hint>
    );
};
