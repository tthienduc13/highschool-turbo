"use client";

import FullCalendar from "@fullcalendar/react";
import { useRef } from "react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export const Calendar = () => {
  const calendarRef = useRef<any>(null);

  return (
    <div>
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
