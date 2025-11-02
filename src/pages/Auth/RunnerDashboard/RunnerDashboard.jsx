import React from 'react'
import "./Runerdashboard.css"
import cube from "../../../assets/cube.png"

const RunnerDashboard = () => {

     const data = [
   {
     title: 'Total Request',
     value: '0',
     icon: (
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
         <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
         <path d="M9 9h6v6H9z"/>
       </svg>
     ),
     color: '#8133F1'
   },
   {
     title: 'Completed',
     value: '0',
     icon: (
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
         <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
         <polyline points="22,4 12,14.01 9,11.01"/>
       </svg>
     ),
     color: '#F59E0B'
   },
   {
     title: 'Active',
     value: '0',
     icon: (
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
         <circle cx="12" cy="12" r="10"/>
         <polyline points="12,6 12,12 16,14"/>
       </svg>
     ),
     color: '#8133F1'
   },
   {
     title: 'Total Spent',
     value: '0',
     icon: (
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
         <line x1="12" y1="1" x2="12" y2="23"/>
         <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
       </svg>
     ),
     color: '#F97316'
   }
 ];
  return (
    <main className='runner-dashboard-layout'>
      <div className='title-dashboard-runner'>
        <h1>Welcome to your Dashboard 👋</h1>

      </div>

      
      <div className="e-grid">
        {data.map((e, index) => (
          <div key={index} className="e-card">
            <div className="e-content">
              <h3 className="e-title">{e.title}</h3>
              <p className="e-value">{e.value}</p>
            </div>
            <div className="e-icon" style={{ color: e.color }}>
              {e.icon}
            </div>
          </div>
        ))}
      </div>
      <div className='dashboard-kyc'>
        <div className='cube-holder'>
        <img src= {cube} alt="" />
        {/* <div className='reminder-holder'><p className='kyc-reminder'>You have no active job yet</p></div> */}
        </div>
        <div className='reminder-holder'><p className='kyc-reminder'>You have no active job yet</p></div>
        <p className='complete-kyc'>complete KYC to get available jobs</p>
        <div className='kyc-btn-holder'>
            <button type='submit' className='kyc-btn'>Complete Kyc</button>
        </div>
      </div>
    </main>
  )
}

export default RunnerDashboard
