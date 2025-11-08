import React from 'react'
import "./EditProfile.css"
import { useParams } from 'react-router-dom'

const EditProfile = () => {
    const { id } = useParams();
    {id}
  return (
       
     <div className="edit-profile-settings">
      
   <div className="edit-header">
     <h1 className="edit-h1">Profile & Settings</h1>
     <p>Manage your account and information preference</p>
   </div>
   <form className="input-wrapper-edit">
      <div className="input-wrapper-edit-holde">
       
       <div>
     <label className="edit-label">Firstname</label>
       <div className="edit-input-text-holder-edit">
         <input type="text" placeholder="firstname" className="input-edit" />
       </div>
          </div>

          <div> 
   <label className="edit-label">Firstname</label>
  <div className="edit-input-text-holder-edit">
  <input type="text" placeholder="firstname" className="input-edit" />
  </div> 
     </div>


     <div>
 <label className="edit-label">Firstname</label>
 <div className="edit-input-text-holder-edit">
   <input type="text" placeholder="firstname" className="input-edit" />
    </div>
    </div>

     <div>
  <label className="text-area-title"> About</label>
 <textarea className="text-area-label"></textarea>
   </div>
  </div>


  </form>

                 <div className="section-password">
                   <div><h1 className="update-text-edit">Update your password?</h1></div>
            <div>
          <label>Current Password</label>
           <div className="password-holder-edit-wrapper">
         <input type="password" className="input-password-edit-page"  placeholder="******" />
          </div>
         </div>


          <div>
 <label>New Password</label>
  <div className="password-holder-edit-wrapper">
   <input type="password" className="input-password-edit-page" placeholder="******" />
  </div>
 </div>


  <div>
   <label>Confirm Password</label>
   <div className="password-holder-edit-wrapper">
     <input type="password" className="input-password-edit-page"  placeholder="******"  />
   </div>
   <button className="update-btn-edit-password">Update Password</button>
 </div>


   <div className="save-change-edit">
    <button className="btn-edit-save-change">save chnages</button>
      <button className="btn-edit-save-changes">save chnages</button>
  </div>
   </div>

          </div>
  )
}

export default EditProfile;
