import FolderDetailModule from "@/components/modules/FolderDetail";
import { Metadata } from "next";

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ username: string }>;
}): Promise<Metadata> => {
    const username = (await params).username;

    return {
        title: `Thư mục của ${username}`,
    };
};

function FolderDetail() {
    return <FolderDetailModule />;
}

export default FolderDetail;
