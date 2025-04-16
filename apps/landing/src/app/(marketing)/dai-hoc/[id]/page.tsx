import UniversityDetailModule from "@/components/modules/UniversityDetail";

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <UniversityDetailModule id={id} />;
}

export default Page;
