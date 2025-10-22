import React, { useEffect, useState } from "react";
import "./ClientVsRunner.css";
import { FaAngleDown, FaChevronUp } from "react-icons/fa6";
import ModalSpinner from "../../Components/ModalSpinner/ModalSpinner";

const ClientVsRunner = () => {
  const [current, setCurrent] = useState(0);
  const [showDropDown, setShowDropDown] = useState(false);
  const [modal, setModal] = useState(false);

  const slides = [
    {
      id: 1,
      image: "https://res.cloudinary.com/dwzomhflw/image/upload/v1761053106/Frame_5_ipbqka.jpg",
      title: "For Client",
      text: "Delegate tasks effortlessly and save time with trusted local runners.",
    },
    {
      id: 2,
      image: "https://res.cloudinary.com/dwzomhflw/image/upload/v1761053103/Group_rwztbx.jpg",
      title: "For Runner",
      text: "Earn money flexibly by completing errands around your area.",
    },
    {
      id: 3,
      image: "https://res.cloudinary.com/dwzomhflw/image/upload/v1761053105/Frame_427319014_bcfats.jpg",
      title: "Secure & Reliable",
      text: "Boost delivery efficiency with reliable local couriers.",
    },
  ];

  useEffect(() => {
    const slider = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 9000);
    return () => clearInterval(slider);
  }, [slides.length]);

  
  const handleSelectRole = () => {
    setModal(true);
    setShowDropDown(false);
    setTimeout(() => setModal(false), 1000); 
  };

  return (
    <div className="clientvs-wrapper">
      <div className="client-right">
        <aside className="logo">
          <div className="errandlogo">
            <img src="https://res.cloudinary.com/dwzomhflw/image/upload/v1761056644/IMG-20251021-WA0052_lf7sms.jpg" alt="" />
          </div>
          <p>ErrandHive</p>
        </aside>

        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="carousel-container"
            style={{
              display: index === current ? "flex" : "none",
            }}
          >
            <div className="client-carousel-img">
              <img src={slide.image} alt="client-img" />
            </div>
            <div className="client-text">
              <h1>{slide.title}</h1>
              <p>{slide.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="client-left">
        <aside>
          <h1>Are you a Client or a Runner?</h1>
        </aside>

        <div className="client-dropdown">
          <p>Select your role</p>
          <div style={{ display: "flex" }}>
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
