import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [kycStatus, setKycStatus] = useState(null);
  const [userKyc, setUserKyc] = useState(localStorage.getItem("userKyc") || false );
//   const [token,setToken]= useState(localStorage.getItem("userToken") || null)
  const BaseUrl = import.meta.env.VITE_BASE_URL;

  const getAUser = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("userDetails"));
      const token = JSON.parse(localStorage.getItem("userToken"));

      if (!userId?.id || !token) return;

     
      const res = await axios.get(`${BaseUrl}/user/${userId.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res?.data?.data);

     
      const kycRes = await axios.get(`${BaseUrl}/kyc/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const kycData = kycRes?.data?.data;
      setKycStatus(kycData?.status);
      setUserKyc(kycData?.status === "Completed");
      localStorage.setItem("userKyc", kycData?.status === "Completed");
      localStorage.setItem("kycStatus", kycData?.status);

      console.log("AppContext User:", res?.data?.data);
      console.log("AppContext KYC:", kycData);
    } catch (error) {
      console.log("Error fetching user or KYC:", error.response?.data || error);
    }
  };

  useEffect(() => {
    getAUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        getAUser,
        userKyc,
        setUserKyc,
        kycStatus, 
        setKycStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
