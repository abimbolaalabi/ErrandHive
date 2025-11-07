import React from 'react'
import "./ReviewModal"
const ReviewModal = ({close}) => {
  return (
    <div className='review-mod-cont'>
       <div className='review-wrapper'>
        <button onClick={()=> close(false)}></button>

       </div>
    </div>
  )
}

export default ReviewModal
