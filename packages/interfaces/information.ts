export type City = {
  provinceName: string;
  provinceId?: number;
  numberSchool: number;
};

export type School = {
  id: string;
  schoolName: string;
  provinceId: number;
  provinceName: string;
  numberDocuments: number;
};

export type CreateSchoolData = {
  provinceId: number;
  schoolName: string;
  locationDetail: string;
};
