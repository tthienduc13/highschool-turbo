import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <Image
          src="/loading.gif"
          alt="Loading"
          width={300}
          height={300}
          className="mx-auto"
        />
      </div>
    </div>
  );
}
