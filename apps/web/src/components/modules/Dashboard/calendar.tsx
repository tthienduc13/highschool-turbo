"use client";

import FullCalendar from "@fullcalendar/react";
import { useRef } from "react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { IconCalendarUser } from "@tabler/icons-react";

export const Calendar = () => {
  const calendarRef = useRef<any>(null);

  return (
    <div className="flex w-full flex-col gap-6 ">
      <div className="flex flex-row items-center gap-2">
        <IconCalendarUser size={24} />
        <h2 className="text-3xl font-semibold">Hoạt động của bạn</h2>
      </div>
      <FullCalendar
        ref={calendarRef}
        allDaySlot={false}
        dayCount={7} // Show only 6 days (Mon-Sat)
        dayHeaderFormat={{ weekday: "short", day: "2-digit" }}
        // eventContent={renderEventContent}
        // events={events}
        expandRows={true}
        firstDay={0} // Start week on Monday
        headerToolbar={false}
        height="auto"
        initialView="timeGridWeek"
        locale={"vi"}
        nowIndicator={true}
        plugins={[timeGridPlugin, interactionPlugin]}
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        slotMaxTime="16:00:00"
        slotMinTime="09:00:00"
      />
    </div>
  );
};
