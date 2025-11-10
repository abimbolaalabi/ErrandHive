import React, { useEffect, useState } from 'react'
import "./ProfileDetailSetting.css"
import { useParams } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import axios from "axios";
import { toast } from "react-toastify";

const ProfileDetailSetting = () => {
  const { profileId } = useParams()
  const token = JSON.parse(localStorage.getItem("userToken"));

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [bio, setBio] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    if (!token) return toast.error("You are not authenticated!");

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("bio", bio);

    try {
      const res = await axios.put(
        `https://errandhive-project.onrender.com/api/v1/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(res.data?.message || "Profile updated successfully");
        localStorage.setItem("userDetails", JSON.stringify(res.data?.data))
      console.log("Updated User:", res.data?.data);

    } catch (err) {
      console.log(" Update error:", err?.response?.data);
      toast.error(err?.response?.data?.message || "Update failed");
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (!token) return toast.error("You are not authenticated!");

    if (!currentPassword || !newPassword || !confirmPassword) {
      return toast.error("All password fields are required");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("New passwords do not match");
    }

    try {
      const res = await axios.put(
        "https://errandhive-project.onrender.com/api/v1/password",
        {
          oldPassword: currentPassword,
          newPassword: newPassword,
          confirmPassword: confirmPassword
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        }
      );

      toast.success(res?.data?.message || "Password updated successfully");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (err) {
      console.log("Password update error:", err?.response?.data);
      toast.error(err?.response?.data?.message || "Password update failed");
    }
  };

    useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userDetails"));
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmailAddress(user.email || "");
      setBio(user.bio || "");
    }
  }, []);

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
                className="input-field"
                   value={emailAddress}
                disabled
                readOnly
              />
            </div>

            <div className="form-group">
              <label className="form-label">About Me</label>
              <textarea
                placeholder="Note about yourself"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
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
