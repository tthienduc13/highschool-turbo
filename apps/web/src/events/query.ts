import { eventBus } from "@/lib/event-bus";
import { SetData } from "@highschool/interfaces";

export const queryEventChannel = eventBus<{
    setQueryRefetched: (data: SetData) => void;
}>();
