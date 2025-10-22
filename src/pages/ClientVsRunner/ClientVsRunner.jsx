import React, { useEffect, useState } from 'react'
import "./ClientVsRunner.css"
import { FaAngleDown } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa6";
const ClientVsRunner = () => {
  const [current, setCurrent] = useState(0);
  const [showDropDown, setShowDropDown] = useState(false)
  const slides = [
    {
      id: 1,
      image: "src/assets/client.jpg",
      title: "For Client",
      text: "Delegate tasks effortlessly and save time with trusted local runners.",
    },
    {
      id: 2,
      image: "src/assets/client.jpg",
      title: "For Runner",
      text: "Earn money flexibly by completing errands around your area.",
    },
    {
      id: 3,
      image: "src/assets/secure.jpg",
      title: "Secure & Reliable",
      text: "Boost delivery efficiency with reliable local couriers.",
    },
  ];

  useEffect(() => {
    const slider = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 9000)

    return () => clearInterval(slider)
  }, [slides.length])

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

  
      </div>
      <div className='client-left'>
        <aside>
          <h1>Are you a Client or a Runner?</h1>
        </aside>

        <div className='client-dropdown'>
          <p>Select your role</p>
          <div style={{ display: "flex" }}>
            {
              showDropDown ? 
              ( <FaAngleDown className='angledown' onClick={() => setShowDropDown(false)} />):
              (<FaChevronUp className='angleup' onClick={() => setShowDropDown(true)} />)
            }

            
          </div>
          {
            showDropDown && (
              <div className='client-drop'>
                <p>Client</p>
                <p>Runner</p>
              </div>
            )
          }

        </div>
      </div>

    </div>
  )
}

export default ClientVsRunner
