import React from 'react'
import "./RuneerMessage.css"
import { IoIosSearch } from "react-icons/io";
const RunnerMessage = () => {
  return (
    <section className='runner-message'>
      <div>
        <h3 className='runner-message-h1'>Messages</h3>
        <p className='runner-message-p'>Chat With your client</p>
      </div>
      <div className='chat-box'>
    <div className='chat-search-box'>
  <div className='search-the-message'>
    <IoIosSearch style={{marginLeft :"2rem"}}/><input type="text" placeholder='search conversations' />
  </div>
  <nav className='chat-search-history'>
    <div className=''>
     <div className='circle-profile'>
        JD
     </div>
     </div>
  </nav>
    </div>
   <div className='chat-app-box'>
    
   </div>
      </div>
    </section>
  )
}

export default RunnerMessage
