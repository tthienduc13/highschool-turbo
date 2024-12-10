import { eventBus } from "@/lib/event-bus";

export const menuEventChannel = eventBus<{
    openSignup: (args: {
        title?: string;
        message?: string;
        callbackUrl?: string;
    }) => void;
    commandMenuClosed: () => void;
}>();
