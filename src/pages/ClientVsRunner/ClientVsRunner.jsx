import React, { useEffect, useState } from "react";
import "./ClientVsRunner.css";
import { FaAngleDown, FaChevronUp } from "react-icons/fa6";
import ModalSpinner from "../../Components/ModalSpinner/ModalSpinner";
import Carousel from "../../Components/Carousel/Carousel";

const ClientVsRunner = () => {

  const [showDropDown, setShowDropDown] = useState(false);
  const [modal, setModal] = useState(false);

  
 
  const handleSelectRole = () => {
    setModal(true);
    setShowDropDown(false);
    setTimeout(() => setModal(false), 1000); 
  };

  return (
    <div className="clientvs-wrapper">
      <div className="client-right">
        <Carousel/>
      </div>

      <div className="client-left">
        <aside>
          <h1>Are you a Client or a Runner?</h1>
        </aside>

        <div className="client-dropdown">
          <p>Select your role</p>
          <div style={{ display: "flex" , padding: "10px"}}>
            {showDropDown ? (
              <FaChevronUp
                className="angleup"
                onClick={() => setShowDropDown(false)}
              />
            ) : (
              <FaAngleDown
                className="angledown"
                onClick={() => setShowDropDown(true)}
              />
            )}
          </div>

          {showDropDown && (
            <div className="client-drop">
              <p onClick={() => handleSelectRole("Client")}>Client</p>
              <p onClick={() => handleSelectRole("Runner")}>Runner</p>
            </div>
          )}
        </div>
      </div>

      {modal && <ModalSpinner />}
    </div>
  );
};

export default ClientVsRunner;