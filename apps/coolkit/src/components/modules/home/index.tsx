"use client"

import { FeatureNav } from './feature-nav';
import { CardQuestion } from '@/components/core/common/cards/card-question';
import { useGetKetCategoryQuery } from '@/api/ket/query';
import { LoadingCard } from '@/components/core/common/loading/loading-card';

function HomeModule() {
    const { data: newKets, isPending: newKetLoading } = useGetKetCategoryQuery({
        numberKet: 8,
        type: "NewUpdate"
    });

    const { data: recommendKets, isPending: recommendKetLoading } = useGetKetCategoryQuery({
        numberKet: 8,
        type: "Recommended"
    });

    const { data: topKets, isPending: topKetLoading } = useGetKetCategoryQuery({
        numberKet: 8,
        type: "TopKet"
    });

    return (
        <div className='container mx-auto px-12'>
            <FeatureNav />
            {/* <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Thể loại</h2>
                <p className="text-gray-600 mb-6">Lựa chọn thể loại game để khám phá những kiến thức mới</p>
                <CategoryNav />
            </div> */}
            {recommendKetLoading ? (
                <LoadingCard />
            ) : (
                recommendKets && recommendKets.length > 0 && (
                    <div className="my-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Đề xuất cho bạn</h2>
                        <p className="text-gray-600 mb-6">Tìm các bộ câu hỏi phù hợp với bạn</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                            {recommendKets.map((set) => (
                                <CardQuestion key={set.id} set={set} />
                            ))}
                        </div>
                    </div>
                )
            )}

            {
                newKetLoading ? (
                    <LoadingCard />
                ) : (
                    newKets && newKets.length > 0 && (
                        <div className="my-10">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">Bộ câu hỏi mới cập nhật</h2>
                            <p className="text-gray-600 mb-6">Khám phá những kiến thức mới ngay</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                                {
                                    newKets?.map((set) => (
                                        <CardQuestion key={set.id} set={set} />
                                    ))
                                }
                            </div>
                        </div>
                    )
                )
            }

            {
                topKetLoading ? (
                    <LoadingCard />
                ) : (
                    topKets && topKets.length > 0 && (
                        <div className="my-10">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">Bộ câu hỏi phổ biến</h2>
                            <p className="text-gray-600 mb-6">Khám phá những kiến thức trong các bộ câu hỏi</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                                {
                                    topKets?.map((set) => (
                                        <CardQuestion key={set.id} set={set} />
                                    ))
                                }
                            </div>
                        </div>
                    )
                )
            }
        </div>
    )
}

export default HomeModule;