import { useSession } from "next-auth/react";
import { Hint } from "../common/hint";
import Link from "next/link";
import {
    IconBrain,
    IconCards,
    IconGridDots,
    IconLayersSubtract,
    IconMeteor,
    IconReport,
} from "@tabler/icons-react";
import { useSet } from "@/hooks/use-set";
import { cn } from "@highschool/ui/lib/utils";
import { menuEventChannel } from "@/events/menu";

export const LinkArea = () => {
    const { flashcard } = useSet();
    return (
        <div className="grid w-full lg:w-[160px] h-fit gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-1">
            <Linkable
                name="Học"
                icon={<IconBrain />}
                href={`/study-set/${flashcard.slug}/learn`}
                requireAuth
            />
            <Linkable
                name="Thẻ"
                icon={<IconCards />}
                href={`/study-set/${flashcard.slug}/flashcards`}
            />
            <Linkable
                name="Kiểm tra"
                icon={<IconReport />}
                href={`/study-set/${flashcard.slug}/test`}
                requireAuth
            />
            <Linkable
                name="Nối"
                icon={<IconLayersSubtract />}
                href={`/study-set/${flashcard.slug}/match?intro=true`}
                requireAuth
            />
            <Linkable name="Ô chữ" icon={<IconGridDots />} comingSoon />
            <Linkable name="Gravity" icon={<IconMeteor />} comingSoon />
        </div>
    );
};

interface LinkableProps {
    name: string;
    icon: React.ReactNode;
    href?: string;
    disabled?: boolean;
    requireAuth?: boolean;
    comingSoon?: boolean;
}

export const Linkable: React.FC<LinkableProps> = ({
    name,
    icon,
    href = "",
    disabled = false,
    requireAuth = false,
    comingSoon = false,
}) => {
    const authed = useSession().status == "authenticated";
    const authEnabled = requireAuth && !authed;
    const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
        if (!comingSoon) return <>{children}</>;

        return <Hint label="Sắp ra mắt">{children}</Hint>;
    };

    const overlay =
        !authEnabled && !comingSoon ? <Link href={href}>{name}</Link> : name;

    return (
        <Wrapper>
            <div
                className={cn(
                    "bg-white dark:bg-gray-800/50 py-4 px-5 rounded-xl border-b-[3px] border-gray-200 dark:border-gray-700 shadow-md group transition-all duration-200 ease-in-out cursor-pointer hover:-translate-y-2 relative",
                    !disabled
                        ? "hover:border-b-blue-400"
                        : "hover:border-b-gray-200 dark:hover:border-b-gray-600"
                )}
                onClick={() => {
                    if (authEnabled)
                        menuEventChannel.emit("openSignup", {
                            message: `Tạo tài khoản để tiếp tục với ${name}`,
                            callbackUrl: href,
                        });
                }}
            >
                <div className="flex flex-row gap-3 items-center">
                    <div className="w-6 h-6 relative">
                        {/* <div
                            className={cn(
                                "w-full h-full absolute top-1 opacity-30 -left-1 transition-all duration-200 ease-in-out group-hover:-translate-x-[3px] group-focus-within:-translate-x-[3px]  backdrop-blur-3xl",
                                !comingSoon ? "text-blue-400" : "text-gray-600"
                            )}
                        >
                            {icon}
                        </div> */}
                        <div className="relative text-primary group-hover:-translate-y-[2px] group-focus-within:-translate-y-[2px] transition-all duration-200 ease-in-out">
                            {icon}
                        </div>
                    </div>
                    <p className="font-bold text-gray-600 dark:text-gray-400">
                        {overlay}{" "}
                    </p>
                </div>
            </div>
        </Wrapper>
    );
};
