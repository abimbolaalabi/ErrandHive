import React from "react";
import "./ModalForWithdraw.css";
import { IoClose } from "react-icons/io5";
import { TbCurrencyNaira } from "react-icons/tb";

const ModalForWithdraw = ({ close, setModal }) => {
  console.log("ModalForWithdraw")
  return (
    <div className="forcontainer">
      <div className="forchild">

        <div className="forheader">
          <h2>Withdraw to Bank</h2>
          <IoClose size={22} className="closeicon" onClick={() => close(false)} />
        </div>

        <p className="forsub">Transfer funds from your wallet to your bank account</p>

        <div className="forbalancebox">
          <div>
            <p className="balance-label">Available Balance</p>
            <p className="balance-amount">₦12,750</p>
          </div>

          <div className="forbalanceicon">
            <TbCurrencyNaira size={22} />
          </div>
        </div>

        <label className="forlabel">Withdrawal Amount</label>
        <input className="forinput" type="number" placeholder="₦ 0.00" />

        <div className="forwarning">
          <span>ⓘ</span> Minimum withdrawal is ₦1,000.00.
        </div>
           
        <button
          className="forbutton"
          onClick={() => {
            close(false);    
            setModal(true);  
          }}
        >
          Continue
        </button>

      </div>
    </div>
  );
};

export default ModalForWithdraw;
