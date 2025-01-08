import { eventBus } from "@/lib/event-bus";

export const menuEventChannel = eventBus<{
  openCreateQuiz: () => void;
  openSignup: (args: {
    title?: string;
    message?: string;
    callbackUrl?: string;
  }) => void;
  openCareerGuidanceModal: () => void;
  openInformationModal: () => void;
  openTeacherInformationModal: () => void;
  commandMenuClosed: () => void;
  createFolder: (setId?: string) => void;
  folderWithSetCreated: (setId: string) => void;
  folderWithDocumentCreated: (documentId: string) => void;
}>();
