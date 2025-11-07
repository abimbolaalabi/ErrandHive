import React, { useState } from 'react'
import "./ProfileDetailSetting.css"
import { useParams } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
const ProfileDetailSetting = () => {
  const { profileId } = useParams()

    const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [emailAddress, setEmailAddress] = useState('');
   const [aboutMe, setAboutMe] = useState('');

   const [currentPassword, setCurrentPassword] = useState('');
   const [newPassword, setNewPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [showCurrentPassword, setShowCurrentPassword] = useState(false);
   const [showNewPassword, setShowNewPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    console.log('Profile saved');
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    console.log('Password updated');
  };

  return (
    <div className="cps-root">
      <div className="cps-container">
        <h2 className="cps-title">Profile &amp; Settings</h2>
        <p className="cps-subtitle">
          Manage your account information and preferences
        </p>

        {/* Personal Information */}
        <div className="cps-card">
          <h3 className="cps-card-title">Personal Information</h3>

          <form onSubmit={handleSaveProfile}>
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email address"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label className="form-label">About Me</label>
              <textarea
                placeholder="Note about yourself"
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
                rows={4}
                className="textarea-field"
              />
            </div>
          </form>
        </div>

        {/* Security */}
        <div className="cps-card">
          <h3 className="cps-card-title">Security (Update Password)</h3>

          <form onSubmit={handleUpdatePassword}>
            <div className="form-group">
              <label className="form-label">Current Password</label>
              <div className="password-field">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="********"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="input-field input-with-icon"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="toggle-visibility"
                  aria-label="Toggle current password visibility"
                >
                  {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">New Password</label>
              <div className="password-field">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="********"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="input-field input-with-icon"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="toggle-visibility"
                  aria-label="Toggle new password visibility"
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div className="password-field">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="********"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field input-with-icon"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="toggle-visibility"
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-btn-primary-mt">
              Update password
            </button>
          </form>
        </div>

        {/* Actions */}
        <div className="actions">
          <button
            type="button"
            className="btn btn-outline"
            onClick={handleSaveProfile}
          >
            Save changes
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSaveProfile}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileDetailSetting
