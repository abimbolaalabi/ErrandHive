import React, { useEffect, useState } from "react";
import "./ModalForWithdraw.css";
import { IoClose } from "react-icons/io5";
import { TbCurrencyNaira } from "react-icons/tb";
import axios from "axios";

const API_BASE_URL = "https://errandhive-project.onrender.com/api/v1";

const ModalForWithdraw = ({ close, setModal, setWithdrawAmount }) => {
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(null);
  const [loadingBalance, setLoadingBalance] = useState(true);
  const [error, setError] = useState("");

  const token = JSON.parse(localStorage.getItem("userToken"));

  const fetchBalance = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/payment/wallet/balance`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBalance(res?.data?.data?.balance || 0);
    } catch (err) {
      setError("Failed to fetch wallet balance.");
    } finally {
      setLoadingBalance(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  const handleContinue = () => {
    if (!amount || amount < 1000) {
      setError("Minimum withdrawal is ₦1,000.00");
      return;
    }

    if (amount > balance) {
      setError("Withdrawal amount exceeds available balance.");
      return;
    }

    setWithdrawAmount(Number(amount));

    close(false);  
    setModal(true); 
  };

  return (
    <div className="forcontainer">
      <div className="forchild">
        <div className="forheader">
          <h2>Withdraw to Bank</h2>
          <IoClose size={22} className="closeicon" onClick={() => close(false)} />
        </div>

        <p className="forsub">
          Transfer funds from your wallet to your bank account
        </p>

        <div className="forbalancebox">
          <div>
            <p className="balance-label">Available Balance</p>
            {!loadingBalance ? (
              <p className="balance-amount">₦{Number(balance).toLocaleString()}</p>
            ) : (
              <p className="balance-amount">Loading...</p>
            )}
          </div>
          <div className="forbalanceicon">
            <TbCurrencyNaira size={22} />
          </div>
        </div>

        <label className="forlabel">Withdrawal Amount</label>
        <input
          className="forinput"
          type="number"
          placeholder="₦ 0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {error && <div className="forwarning" style={{ color: "red" }}>{error}</div>}

        <button
          className="forbutton"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ModalForWithdraw;
