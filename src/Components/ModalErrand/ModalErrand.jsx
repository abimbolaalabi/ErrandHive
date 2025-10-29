import React from 'react'
import "./ModalErrand.css"
const ModalErrand = ({toclose}) => {
  return (
    <div className='modalerrand-container'>
      <div className='modalerrand-child'>
        <span onClick={()=>toclose(false)} >X</span>
      </div>
    </div>
  )
}

export default ModalErrand
