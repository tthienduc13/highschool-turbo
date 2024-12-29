import { SetData } from "@highschool/interfaces";

import { eventBus } from "@/lib/event-bus";

export const queryEventChannel = eventBus<{
  setQueryRefetched: (data: SetData) => void;
}>();
