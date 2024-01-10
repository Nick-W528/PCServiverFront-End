import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {    
    const [currentUser, setCurrentUser] = useState(null);
    console.log(currentUser);    

    const setUser = (user) => {
        setCurrentUser(user);
    };

    const fetchUserData = async (token) => {        
        try {
            const response = await axios.get('http://localhost:8800/users/current', {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },                
            })                
            setUser(response.data);
        } catch (err) {
            setUser(null);
            console.log(err);
        }
  }

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {        
        fetchUserData(token)
    }
  }, []);

    return (
        <UserContext.Provider value={{ currentUser, setUser, fetchUserData }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};