import { cn } from "@highschool/ui/lib/utils";

export interface ThemePreviewProps {
    variant: "light" | "dark";
    selected?: boolean;
}

export const ThemePreview = ({ variant, selected }: ThemePreviewProps) => {
    const light = variant == "light";
    return (
        <div
            className={cn(
                "w-48 h-[100px] rounded-md p-2 overflow-hidden shadow-sm border-2 transition-all duration-1000 ease-cubic-ease",
                selected ? "border-blue-500" : "border-transparent",
                light ? "bg-gray-100" : "bg-gray-950"
            )}
        >
            <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2">
                    <div
                        className={
                            (cn("h-1 w-4 rounded-sm"),
                            light ? "bg-gray-50" : "bg-gray-700/50")
                        }
                    />
                    <div className="h-2 w-4 bg-blue-400 rounded-sm shadow-sm" />
                </div>
                <div className="flex flex-col gap-[6px]">
                    <div className="flex flex-col gap-[2px]">
                        <div
                            className={cn(
                                "h-[9px] w-full rounded-[2px] ",
                                light ? "bg-gray-50" : "bg-gray-700"
                            )}
                        />
                        <div className="flex flex-row gap-[2px] ">
                            <div
                                className={cn(
                                    "w-[6px] h-[6px] ",
                                    light ? "bg-gray-50 " : " bg-gray-700"
                                )}
                            />
                            <div
                                className={cn(
                                    "w-[30px] h-[4px] rounded-[2px] ",
                                    light ? "bg-gray-50 " : " bg-gray-700"
                                )}
                            />
                        </div>
                        <div className="flex flex-row items-stretch gap-1">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div
                                    className={cn(
                                        "h-3 w-full shadow-sm rounded-[2px]",
                                        light ? "bg-white" : "bg-gray-800/50"
                                    )}
                                    key={i}
                                />
                            ))}
                        </div>
                        <div
                            className={cn(
                                "w-full h-[53px] mt-[2ox] rounded-[4px] shadow-sm relative overflow-hidden",
                                light ? "bg-white" : "bg-gray-800/50"
                            )}
                        >
                            <div className="w-1/3 h-[1px] bg-orange-300 top-0 left-0 absolute" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
