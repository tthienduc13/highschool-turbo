import { HeadingAreaSkeleton } from "./heading-skeleton";

export const SetLoading = () => {
    return (
        <div className="max-w-7xl mx-auto w-full">
            <div className=" flex flex-col space-y-10">
                <HeadingAreaSkeleton />
            </div>
        </div>
    );
};
