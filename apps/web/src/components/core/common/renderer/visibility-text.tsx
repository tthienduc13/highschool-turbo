import { StudySetVisibility } from "@highschool/interfaces";

export const visibilityText = (visibility: StudySetVisibility) => {
  switch (visibility) {
    case StudySetVisibility.Public:
      return "Công khai";
    case StudySetVisibility.Unlisted:
      return "Đường dẫn liên kết";
    case StudySetVisibility.Private:
      return "Chỉ mình thôi";
    case StudySetVisibility.Closed:
      return "Đã bị xoá";
  }
};
