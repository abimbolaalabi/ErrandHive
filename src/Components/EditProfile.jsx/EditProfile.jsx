import React, { useState } from 'react';
import "./EditProfile.css";
import { Eye, EyeOff } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const EditProfile = () => {
  const storedUser = JSON.parse(localStorage.getItem('userDetails')) || {};
  const profileId = storedUser.id || storedUser._id;
  const token = localStorage.getItem("userToken");
  const BaseUrl = import.meta.env.VITE_BASE_URL;

  const [firstName, setFirstName] = useState(storedUser.firstName || '');
  const [lastName, setLastName] = useState(storedUser.lastName || '');
  const [aboutMe, setAboutMe] = useState(storedUser.bio || '');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (currentPassword || newPassword || confirmPassword) {
      if (!currentPassword) {
        toast.error("Current password is required to update password");
        return;
      }
      if (newPassword.length < 6) {
        toast.error("New password must be at least 6 characters");
        return;
      }
      if (newPassword !== confirmPassword) {
        toast.error("New passwords do not match");
        return;
      }
    }

    setLoading(true);

    try {
      const res = await axios.put(
        `${BaseUrl}/update/${profileId}`,
        {
          firstName,
          lastName,
          bio: aboutMe,
          ...(currentPassword && newPassword && { currentPassword, newPassword })
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200) {
        toast.success(res.data.message || "Profile updated successfully!");
        const updatedUser = res.data.data;

        // Update localStorage without touching email
        localStorage.setItem('userDetails', JSON.stringify({
          ...storedUser,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          bio: updatedUser.bio,
          profileImage: updatedUser.profileImage
        }));

        // Reset password fields
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        toast.error(res.data.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="editprofile-root">
      <div className="editprofile-container">
        <h2 className="editprofile-title">Profile & Settings</h2>
        <p className="editprofile-subtitle">Manage your account information and preferences</p>

        <div className="editprofile-card">
          <h3 className="editprofile-card-title">Personal Information</h3>
          <form onSubmit={handleSaveChanges}>
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
                value={storedUser.email || ''}
                className="input-field"
                disabled
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

            <h3 className="editprofile-card-title">Security (Update Password)</h3>

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

            <button type="submit" className="btn-btn-primary-mt" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default EditProfile;
