import { Metadata } from "next";

import UserProfileModule from "@/components/modules/UserProfile";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> => {
  const username = (await params).username;

  return {
    title: username,
  };
};

async function UserProfile() {
  return <UserProfileModule />;
}

export default UserProfile;
