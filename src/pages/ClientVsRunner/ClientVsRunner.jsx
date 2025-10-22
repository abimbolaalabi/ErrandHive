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
    <div className='clientvs-wrapper'>
      <div className='client-right'>
        <aside className='logo'>
          <p>ErrandHive</p>
        </aside>
       {slides.map((slide, index) => (
          <div
            key={slide.id}
            className='carousel-container'
            style={{
              display: index === current ? 'flex' : 'none',
            }}
        >
            <div className='client-carousel-img'>
              <img src={slide.image} alt="client-img" />
            </div>
            <div className='client-text'>
              <h1>{slide.title}</h1>
              <p>{slide.text}</p>
            </div>
          </div>
        ))}

  
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
