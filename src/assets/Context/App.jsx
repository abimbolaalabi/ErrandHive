import { createContext } from 'react';


const AppContext = createContext(null);


const AppProvider=({ children}) => {

    return(
        <AppContext.Provider >
            {children}
        </AppContext.Provider>
    )
};

export { AppContext, AppProvider };
