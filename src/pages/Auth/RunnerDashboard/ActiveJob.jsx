import React from 'react'
import "./ActiveJob.css"
import { SlLocationPin } from "react-icons/sl";
import { CiClock2 } from "react-icons/ci";
import { TbCurrencyNaira } from "react-icons/tb";
const ActiveJob = () => {
  const obj = [
    {
      title: "Active Jobs",
      number: "1",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <path d="M9 9h6v6H9z" />
        </svg>
      ),
      color: '#8133F1'
    },
    {
      title: "Pending Jobs",
      number: "1",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
      color: '#F97316'
    },
    {
      title: "Completed Jobs",
      number: "1",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12,6 12,12 16,14" />
        </svg>
      ),
      color: '#10B981'
    },
    {
      title: "Total Spent",
      number: "1",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
      color: '#EF4444'
    }
  ];

  return (
    <section className='active-job'>
      <h1 className='active-job-title'>Active Jobs</h1>

      <div className='card-holder-active-job'>
        {obj.map((e, index) => (
          <div className='card-active-job' key={index}>
            <div className='text-container-job'>
              <p className='active-job-description'>{e.title}</p>
              <p className='number-jobs'>{e.number}</p>
            </div>

            <div className='icon-circle' style={{ backgroundColor: e.color }}>
              <div className='icon-holder-jobs'>
                {e.icon}
              </div>
            </div>
            
          </div>
        ))}
        
      </div>
       <div className='delivery-card-job'>
       <div className='active-delivery-holder-1'>
        <div className='picky-wrapper'>
        <h1 className='pickup holder'>Pickup Document</h1>
        </div>
        <div className='pickup-address-job'> 
        
     <div className='pickup-address-street-tiyle'><SlLocationPin />Pickup at muyibi</div>
     <div className='pickup-address-street-'>40 Muyibi street</div>
        </div>
        <div className='pickup-address-date-job'>
       <div > < CiClock2 />20/10/2025 <span>< TbCurrencyNaira style={{fontSize:"1rem"}}/>3,000</span></div>
        </div>
       </div>
       <div  className='active-delivery-holder-2' >
      <div className='pckup-2-box'>
        <p><SlLocationPin /> Delivery </p>
        <p>50 kirikiri road</p>
      </div>
      <div className='pickup-2-20box'>
        <button className='negotiation-btn'>Start Negotiation</button>
      </div>
       </div>
 </div>
    </section>
  )
}

export default ActiveJob