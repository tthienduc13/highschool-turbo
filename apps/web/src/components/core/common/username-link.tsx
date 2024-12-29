import Link from "next/link";

interface UsernameLinkProps {
  displayName: string;
  username: string;
}

export const UsernameLink = ({ displayName, username }: UsernameLinkProps) => {
  return (
    <Link
      className="font-bold transition-all duration-200 ease-in-out hover:text-blue-500 dark:hover:text-blue-200"
      href={`/profile/${username}`}
    >
      {displayName}
    </Link>
  );
};
