import { useContext, useEffect, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
} from "date-fns";
import "./DatePicker.css";
import { AppContext } from "../Utils/AppContext";
import { useUser } from "../Utils/UserContext";
import { Box } from "@mui/material";
import { JobService } from "../../Services/Jobs/JobService";
import { DateHelper } from "../Utils/FormatDate";

function Calendar() {
  const { currentUser } = useUser();
  const { selectedDate, setSelectedDate } = useContext(AppContext);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const userId = currentUser._id;

      JobService.GetJobsByUser(userId).then((res) => {
        setJobs(res.data);
      });
    }    
  }, []);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const handleClick = (cloneDay) => {      
    const formattedDate = DateHelper.convertBstToUtc(cloneDay);    
    setSelectedDate(formattedDate);
  };

  const renderHeader = () => (
    <div className="calendar-header">
      <button onClick={prevMonth} className="nav-button">
        ⬅
      </button>
      <h2>{format(currentMonth, "MMMM yyyy")}</h2>
      <button onClick={nextMonth} className="nav-button">
        ➡
      </button>
    </div>
  );

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 0 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="day-name">
          {format(addDays(startDate, i), "EEE")}
        </div>
      );
    }
    return <div className="calendar-days">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;        
        days.push(
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <div
              key={day}
              onClick={() => {
                handleClick(cloneDay);
              }}
              className={`calendar-cell 
              ${!isSameMonth(day, monthStart) ? "disabled" : ""} 
              ${isSameDay(day, selectedDate) ? "selected" : ""}`}
            >
              <span className="job-date">
              {format(day, "d")}
              </span>
               <span className="job-items">              
              {jobs.map((job) =>                
               DateHelper.isSameLocalDay(job.dueDate, day) ? (
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    role="img"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="4" cy="4" r="3.5" fill="#F4DFC8" />
                  </svg>
                ) : null
              )}
            </span>
            </div>           
          </Box>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="calendar-row" key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return <div className="calendar-body">{rows}</div>;
  };

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}

export default Calendar;
