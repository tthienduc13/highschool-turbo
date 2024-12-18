export interface ResponseModel<T> {
    status: number;
    message: string;
    data?: T;
}

export enum TypeExam {
    T1H = "T1H",
    FIE = "FIE",
    NHE = "NHE",
    CAP = "CAP",
    // OTHER = 'OTHER'
}

export const examDescriptions: { [key in TypeExam]: string } = {
    [TypeExam.T1H]: "Kiểm tra 1 tiết",
    [TypeExam.FIE]: "Kiểm tra cuối kỳ",
    [TypeExam.NHE]: "THPT Quốc Gia ",
    [TypeExam.CAP]: "Đánh giá năng lực",
    // [TypeExam.OTHER]: 'Other'
};
