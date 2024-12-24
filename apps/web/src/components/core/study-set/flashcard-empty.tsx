export interface FlashcardsEmptyProps {
    h?: string;
}

export const FlashcardsEmpty = ({ h = "500px" }: FlashcardsEmptyProps) => {
    return (
        <div
            style={{ minHeight: h }}
            className={`w-full  flex items-center justify-center overflow-hidden rounded-xl border p-8 shadow-xl`}
        >
            <div className="w-full">
                <div className="text-center text-lg text-muted-foreground">
                    Không có thẻ nào trong bộ học phần này
                </div>
            </div>
        </div>
    );
};
