import {
    Credenza,
    CredenzaBody,
    CredenzaContent,
    CredenzaDescription,
    CredenzaFooter,
    CredenzaHeader,
    CredenzaTitle,
} from "@/components/ui/credenza";
import { Button } from "@highschool/ui/components/ui/button";
import { Separator } from "@highschool/ui/components/ui/separator";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { IconLoader2 } from "@tabler/icons-react";

export interface ConfirmModalProps {
    isOpen: boolean;
    heading?: string;
    body: React.ReactNode;
    isLoading?: boolean;
    actionText?: string;
    destructive?: boolean;
    cancelText?: string;
    onClose: () => void;
    onCancel?: () => void;
    onConfirm: () => void;
}

export const ConfirmModal = ({
    isOpen,
    heading,
    body,
    isLoading,
    actionText,
    destructive,
    cancelText,
    onClose,
    onCancel,
    onConfirm,
}: ConfirmModalProps) => {
    return (
        <Credenza open={isOpen} onOpenChange={onClose}>
            <CredenzaContent className="p-0 gap-0">
                <CredenzaHeader className="pt-4 md:pt-8 px-5 md:px-10">
                    <CredenzaTitle className="md:text-3xl text-2xl font-bold">
                        {heading || "Bạn chắc chứ"}
                    </CredenzaTitle>
                    <VisuallyHidden>
                        <CredenzaDescription>
                            Không có phụ đề
                        </CredenzaDescription>
                    </VisuallyHidden>
                </CredenzaHeader>
                <CredenzaBody className="px-5 mt-4 pb-4 md:pb-8 md:px-10">
                    <div>{body}</div>
                </CredenzaBody>
                <Separator />
                <CredenzaFooter className="px-5 md:px-10 py-6">
                    <Button
                        disabled={isLoading}
                        variant={cancelText ? "outline" : "ghost"}
                        onClick={() => {
                            onCancel?.();
                            onClose();
                        }}
                    >
                        {cancelText ?? "Huỷ"}
                    </Button>
                    <Button
                        disabled={isLoading}
                        onClick={onConfirm}
                        variant={destructive ? "destructive" : "default"}
                    >
                        {isLoading ? (
                            <IconLoader2 className="animate-spin" />
                        ) : (
                            (actionText ?? "Xác nhận")
                        )}
                    </Button>
                </CredenzaFooter>
            </CredenzaContent>
        </Credenza>
    );
};
