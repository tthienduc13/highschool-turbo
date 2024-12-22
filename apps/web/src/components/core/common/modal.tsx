import {
    Credenza,
    CredenzaBody,
    CredenzaClose,
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

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children?: React.ReactNode;
    buttonLabel?: string;
    onConfirm?: () => void;
    description?: string;
    isPending?: boolean;
    isDisabled?: boolean;
}

export const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    buttonLabel = "Xác nhận",
    onConfirm,
    description,
    isPending,
    isDisabled,
}: ModalProps) => {
    return (
        <Credenza open={isOpen} onOpenChange={onClose}>
            <CredenzaContent className="p-0 gap-0 border-none max-w-xl w-full border-2 border-gray-300 dark:border-gray-700 shadow-lg ">
                <CredenzaHeader className="md:px-10 px-5 pt-4 md:pt-8">
                    <CredenzaTitle className="md:text-3xl text-2xl">
                        {title}
                    </CredenzaTitle>
                    {description ? (
                        <CredenzaDescription>{description}</CredenzaDescription>
                    ) : (
                        <VisuallyHidden>
                            <CredenzaDescription>
                                Không có phụ đề
                            </CredenzaDescription>
                        </VisuallyHidden>
                    )}
                </CredenzaHeader>
                <CredenzaBody className="px-5 md:px-10 pb-8 mt-4">
                    {children}
                </CredenzaBody>
                <Separator />
                <CredenzaFooter className="px-5 md:px-10 py-6">
                    <CredenzaClose asChild>
                        <Button disabled={isPending} variant={"ghost"}>
                            Huỷ
                        </Button>
                    </CredenzaClose>
                    <Button
                        disabled={isPending || isDisabled}
                        onClick={onConfirm}
                    >
                        {isPending ? (
                            <IconLoader2 className="animate-spin" />
                        ) : (
                            buttonLabel
                        )}
                    </Button>
                </CredenzaFooter>
            </CredenzaContent>
        </Credenza>
    );
};
