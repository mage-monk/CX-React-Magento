import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import Card from "../../ui/card/Card";
const events = [
  { title: "Meeting", start: new Date() },
  {
    title: "React FE Demo Call",
    start: new Date("2023-02-03T14:00:00"),
    end: new Date("2023-02-03T15:00:00"),
    backgroundColor: "green",
  },
];
const Appointments = () => {
  return (
    <Card className="p-20 mb-20 clearfix rounded-0">
      <div className="c-header-title checkout_title mb-20">My Appointments</div>
      <div className="row">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={false}
          events={events}
        />
      </div>
    </Card>
  );
};

export default Appointments;
