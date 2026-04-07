import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { getStoredBoolean, getStoredJson } from "../utils/storage";

const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [kycStatus, setKycStatus] = useState(null);
  const [userKyc, setUserKyc] = useState(getStoredBoolean("userKyc", false));
//   const [token,setToken]= useState(localStorage.getItem("userToken") || null)
  const BaseUrl = import.meta.env.VITE_BASE_URL;

  const getAUser = async () => {
    try {
      const storedUser = getStoredJson("userDetails", null);
      const token = localStorage.getItem("userToken");

      if (!storedUser?.id || !token) return;

     
      const res = await axios.get(`${BaseUrl}/user/${storedUser.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res?.data?.data);

     
      const kycRes = await axios.get(`${BaseUrl}/kyc/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const kycData = kycRes?.data?.data;
      setKycStatus(kycData?.status);
      const isVerified = kycData?.status === "Completed";
      setUserKyc(isVerified);
      localStorage.setItem("userKyc", String(isVerified));
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
