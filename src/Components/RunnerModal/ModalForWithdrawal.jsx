import React, { useState } from "react";
import "./ModalForWithdrawal.css";
import { IoClose } from "react-icons/io5";
import { TbCurrencyNaira } from "react-icons/tb";
import { FiInfo } from "react-icons/fi";

const ModalForWithdrawal = ({ toclose , setOpen }) => {
  const [amount, setAmount] = useState("1000"); 
  const availableBalance = "12,750";
  const summaryAmount = "1,000";

console.log("ModalForWithdrawal")
  return (
    <div className="mddcontainer"> 
      <div className="mddwrapper">

        <div className="mddheader">
          <h2>Withdraw to Bank</h2>
          <IoClose className="mddclose" size={20} onClick={() => toclose(false)} />
        </div>

        <p className="mddsub">Transfer funds from your wallet to your bank account</p>

        <div className="mddbalancebox">
          <div>
            <p className="mddbalance-label">Available Balance</p>
            <p className="mddbalance-amount">₦{availableBalance}</p> 
          </div>

          <div className="mddbalanceicon">
            <TbCurrencyNaira size={20} />
          </div>
        </div>

        <label className="mddlabel">Withdrawal Amount</label>
     <div className="mddinput-container">
      <span className="mddinput-naira">₦</span>
      <input
        type="text"
        className="mddinput"
        value={amount} // Use the state variable
        onChange={(e) => setAmount(e.target.value)} // Add the handler back
      />
      </div>
        
        <div className="mddsummarybox">
          <div className="mddsummaryrow">
            <p>Withdrawal Amount</p>
            <p className="mddsummary-naira">₦{summaryAmount}</p>
          </div>

          <div className="mddsummaryrow">
            <p>Total Deduction</p>
            <p className="mddsummary-naira">₦{summaryAmount}</p>
          </div>
        </div>
        
        <div className="mddwarning">
            <FiInfo size={16} className="mddwarning-icon" /> 
            <span>Minimum withdrawal is ₦1,000.00.</span>
        </div>

        <button className="mddbutton" onClick={()=> {
           toclose(false)
           setOpen(true)
        }}>Continue</button>
      </div>
    </div>
  );
};

export default ModalForWithdrawal;