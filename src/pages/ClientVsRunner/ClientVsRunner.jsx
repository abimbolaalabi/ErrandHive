import React, { useEffect, useState } from "react";
import "./ClientVsRunner.css";
import { FaAngleDown, FaChevronUp } from "react-icons/fa6";
import ModalSpinner from "../../Components/ModalSpinner/ModalSpinner";
import Carousel from "../../Components/Carousel/Carousel";

const ClientVsRunner = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [modal, setModal] = useState(false);

  const handleSelectRole = (role) => {
    console.log("Selected:", role);
    setModal(true);
    setShowDropDown(false);
    setTimeout(() => setModal(false), 1000);
  };

  return (
    <div className="clientvs-wrapper">
      <div className="client-right">
        <Carousel />
      </div>

      <div className="client-left">
        <div className="client-left-wrapper">
          <aside>
            <h1>Are you a Client or a Runner?</h1>
          </aside>

    
          <div
            className="client-dropdown"
            onClick={() => setShowDropDown((prev) => !prev)}
          >
            <p>Select your role</p>

            <div style={{ display: "flex", padding: "10px" }}>
              {showDropDown ? (
                <FaChevronUp
                  className="angleup"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    setShowDropDown(false);
                  }}
                />
              ) : (
                <FaAngleDown
                  className="angledown"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    setShowDropDown(true);
                  }}
                />
              )}
            </div>

            
            {showDropDown && (
              <div
                className="client-drop"
                onClick={(e) => e.stopPropagation()}
              >
                <p onClick={() => handleSelectRole("Client")}>Client</p>
                <p onClick={() => handleSelectRole("Runner")}>Runner</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {modal && <ModalSpinner />}
    </div>
  );
};

export default ClientVsRunner;
