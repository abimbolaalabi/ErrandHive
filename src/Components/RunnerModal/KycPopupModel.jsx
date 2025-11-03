import React from 'react'
import "./Kycpopup.css"
const KycPopupModel = ({close}) => {
  return (
    <div className='Kyc-modal-wrapper'>
      <div className='kyc-modal'>
     <button onClick={()=> close(false)}>X</button>
      </div>
    </div>
  )
}

export default KycPopupModel
