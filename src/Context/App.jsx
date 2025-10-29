import { createContext, useState } from 'react';


const AppContext = createContext(null);


const AppProvider=({ children}) => {
    const [user,setUser] = useState(null)
    const [userType, setUserType] = useState('Client') // Default to Client, can be 'Client' or 'Runner'

    return(
        <AppContext.Provider value={{user, setUser, userType, setUserType}}  >
            {children}
        </AppContext.Provider >
    )
};
//josjua

export { AppContext, AppProvider };
