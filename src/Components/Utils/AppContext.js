import { createContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [jobs, setJobs] = useState([]);

    return (
        <AppContext.Provider value={{ selectedDate, setSelectedDate, jobs, setJobs }}>
            {children}
        </AppContext.Provider>
    )
}