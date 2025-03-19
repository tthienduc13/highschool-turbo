"use client";

import { useParams } from "next/navigation";

import ReportDetailModule from "@/components/modules/reports/detail";

function ReportDetailPage() {
    const param = useParams();

    const id = Array.isArray(param.id) ? param.id[0] : param.id;

    return <ReportDetailModule id={id ?? ""} />;
}

export default ReportDetailPage;
