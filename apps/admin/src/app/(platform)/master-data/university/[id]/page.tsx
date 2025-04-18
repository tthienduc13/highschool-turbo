import UniversityMajorModule from "@/components/modules/university-major";

type Params = Promise<{ id: string }>;

async function UniversityMajorProps({ params }: { params: Params }) {
    const { id } = await params;

    return <UniversityMajorModule slug={id} />;
}

export default UniversityMajorProps;
