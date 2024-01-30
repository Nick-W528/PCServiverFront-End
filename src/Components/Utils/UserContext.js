import { createContext, useContext, useEffect, useState } from 'react';
import { UsersService } from '../../Services/Users/UsersService';

const UserContext = createContext();

export const UserProvider = ({ children }) => {    
    const [currentUser, setCurrentUser] = useState(null);    
    
    const setUser = (user) => {
        setCurrentUser(user);
    };

  const fetchUserData = async (token) => {
    try {
        const response = await UsersService.getCurrentUser();
        setUser(response);
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