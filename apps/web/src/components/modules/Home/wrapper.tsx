interface WrapperProps {
    title: string;
    children: React.ReactNode;
}

export const Wrapper = ({ title, children }: WrapperProps) => {
    return (
        <div className="flex flex-col gap-2">
            <h2 className="pl-4 md:pl-0 text-gray-600 dark:text-gray-200 font-semibold">
                {title}
            </h2>
            {children}
        </div>
    );
};
