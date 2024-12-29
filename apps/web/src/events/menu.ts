import { eventBus } from "@/lib/event-bus";

export const menuEventChannel = eventBus<{
  openSignup: (args: {
    title?: string;
    message?: string;
    callbackUrl?: string;
  }) => void;
  openCareerGuidanceModal: () => void;
  commandMenuClosed: () => void;
  createFolder: (setId?: string) => void;
  folderWithSetCreated: (setId: string) => void;
  folderWithDocumentCreated: (documentId: string) => void;
}>();
