import { Button } from "@highschool/ui/components/ui/button";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Button>{process.env.NEXT_PUBLIC_LANDING_URL}</Button>
    </div>
  );
}
