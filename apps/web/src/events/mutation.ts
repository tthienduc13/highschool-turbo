import { eventBus } from "@/lib/event-bus";

export const mutationEventChannel = eventBus<{
  submitUsername: () => void;
  submitProvince: () => void;
  submitStudentInfo: () => void;
  submitTeacherInfo: () => void;

  //   Flashcard
  toggleCardSorting: (check: boolean) => void;
  toggleStudyStarred: (check: boolean) => void;
}>();
