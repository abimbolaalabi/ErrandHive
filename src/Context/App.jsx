import axios from 'axios';
import { createContext, useEffect, useState } from 'react';


const AppContext = createContext(null);


const AppProvider=({ children}) => {
    const [user,setUser] = useState(null)
    const BaseUrl = import.meta.env.VITE_BASE_URL

    const getAUser = async ()=> {
        try {
            const userId = JSON.parse(localStorage.getItem("userDetails"))
            console.log(userId)
            const res = await axios.get(`${BaseUrl}/user/${userId.id}`)
            setUser(res?.data?.data)
            console.log("This is res from app Context",res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getAUser()
    },[])

    return(
        <AppContext.Provider value={{user, setUser, getAUser}}  >
            {children}
        </AppContext.Provider >
    )
};


export { AppContext, AppProvider };

