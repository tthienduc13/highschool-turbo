import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <Image
          alt="Loading"
          className="mx-auto"
          height={300}
          src="/loading.gif"
          width={300}
        />
      </div>
    </div>
  );
}
