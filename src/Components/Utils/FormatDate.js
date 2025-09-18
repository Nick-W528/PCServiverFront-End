import {formatInTimeZone} from "date-fns-tz"

const FormatDate = (date) => {    
    return new Date(date).toISOString().split("T")[0];
}

const isSameLocalDay = (jobDate, calendarDate) => {    
    const convertedJobDate = new Date(jobDate);
    const convertedCalDate = new Date(calendarDate)    
    return (
        convertedJobDate.getFullYear() === convertedCalDate.getFullYear() &&
        convertedJobDate.getMonth() === convertedCalDate.getMonth() &&
        convertedJobDate.getDate() === convertedCalDate.getDate()
    );
}

const convertBstToUtc = (bstDate) => {
    const inTimeZone = formatInTimeZone(bstDate, 'Europe/London', 'yyyy-MM-dd');
    const dateObj = new Date(inTimeZone);    
    const formattedDate = dateObj.toISOString().split("T")[0];
    
    return formattedDate;
}

export const DateHelper = {
    FormatDate,
    isSameLocalDay,
    convertBstToUtc
};