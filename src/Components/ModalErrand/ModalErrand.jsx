import React, { useState } from "react";
import "./ModalErrand.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaLocationDot, FaPhone, FaPaperclip } from "react-icons/fa6";
import { FaBook } from "react-icons/fa";
import { FaNairaSign } from "react-icons/fa6";

const ModalErrand = ({ toclose }) => {
  const navigate = useNavigate();
  const BaseUrl = import.meta.env.VITE_BASE_URL;

  const [formData, setFormData] = useState({
    title: "",
    pickupAddress: "",
    pickupContact: "",
    deliveryAddress: "",
    price: "",
    description: "",
  });

  const [file, setFile] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const token = JSON.parse(localStorage.getItem("userToken"));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const { title, pickupAddress, pickupContact, deliveryAddress, price, description } = formData;
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Errand title is required";
    if (!pickupAddress.trim()) newErrors.pickupAddress = "Pickup address is required";
    if (!pickupContact.trim()) newErrors.pickupContact = "Pickup contact is required";
    else if (!/^\d{11}$/.test(pickupContact)) newErrors.pickupContact = "Enter a valid 11-digit phone number";

    if (!deliveryAddress.trim()) newErrors.deliveryAddress = "Delivery address is required";

    if (!price) newErrors.price = "Price is required";
    else if (isNaN(price) || Number(price) <= 0) newErrors.price = "Price must be a valid number";

    if (!description.trim()) newErrors.description = "Description is required";

    setFormErrors(newErrors);

    if (Object.values(newErrors).length > 0) {
      toast.error(Object.values(newErrors)[0]);
      return false;
    }
    return true;
  };

  // // Add this function to handle the top note button click
  // const handleTopNoteClick = () => {
  //   toast.info("For safety reasons, we do not allow errands with items valued above ₦100,000. Please keep your errand items within this value.");
  // };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {

      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("pickupAddress", formData.pickupAddress);
      formDataToSend.append("pickupContact", formData.pickupContact);
      formDataToSend.append("deliveryAddress", formData.deliveryAddress);
      formDataToSend.append("price", Number(formData.price));
      formDataToSend.append("description", formData.description);

      if (file) {
        formDataToSend.append("attachments", file);
      }

      const res = await axios.post(
        `${BaseUrl}/errand/create`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(res?.data?.message || "Errand created successfully!");
      setTimeout(() => {
        toclose(false);
        navigate("/dashboard/my-errands");
      }, 1000);

      setFormData({
        title: "",
        pickupAddress: "",
        pickupContact: "",
        deliveryAddress: "",
        price: "",
        description: "",
      });
      setFile(null);
      setFormErrors({});
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error?.message || "Failed to create errand");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modalerrand-container">
      <div className="modalerrand-child">
        <div className="top-note-container">
          {/* Changed from p to button */}
          <button className="top-note-button" >
            Note!! Do not place items above <strong>₦100,000</strong> for pickup
          </button>
          <span onClick={() => toclose(false)} className="closee-button">X</span>
        </div>

        <h2 className="post-errand-header">Post New Errand</h2>
        <p className="post-errand-subheader">
          Fill in the details for your errand. All fields are required.
        </p>

        <div className="form-content">

          <div className="input-group">
            <p className="label-with-icon"><FaBook /> Errand Title</p>
            <input
              type="text"
              name="title"
              placeholder="e.g., Grocery Shopping, Document Pickup"
              className={`form-input ${formErrors.title ? "error-input" : ""}`}
              onChange={handleChange}
              value={formData.title}
            />
            {formErrors.title && <span className="error-text">{formErrors.title}</span>}
          </div>

          <div className="input-group">
            <p className="label-with-icon"><FaLocationDot /> Pickup Address</p>
            <input
              type="text"
              name="pickupAddress"
              placeholder="Enter pickup location"
              className={`form-input ${formErrors.pickupAddress ? "error-input" : ""}`}
              onChange={handleChange}
              value={formData.pickupAddress}
            />
            {formErrors.pickupAddress && <span className="error-text">{formErrors.pickupAddress}</span>}
          </div>

          <div className="input-group">
            <p className="label-with-icon"><FaPhone /> Pickup Contact Phone</p>
            <input
              type="tel"
              name="pickupContact"
              placeholder="e.g. 09078651221"
              className={`form-input ${formErrors.pickupContact ? "error-input" : ""}`}
              onChange={handleChange}
              value={formData.pickupContact}
            />
            {formErrors.pickupContact && <span className="error-text">{formErrors.pickupContact}</span>}
          </div>

          <div className="input-group">
            <p className="label-with-icon"><FaLocationDot /> Delivery Address</p>
            <input
              type="text"
              name="deliveryAddress"
              placeholder="Enter delivery location"
              className={`form-input ${formErrors.deliveryAddress ? "error-input" : ""}`}
              onChange={handleChange}
              value={formData.deliveryAddress}
            />
            {formErrors.deliveryAddress && <span className="error-text">{formErrors.deliveryAddress}</span>}
          </div>

          <div className="input-group">
            <p className="label-with-icon"><FaNairaSign /> Price</p>
            <input
              type="number"
              name="price"
              placeholder="e.g. 5000"
              className={`form-input ${formErrors.price ? "error-input" : ""}`}
              onChange={handleChange}
              value={formData.price}
            />
            {formErrors.price && <span className="error-text">{formErrors.price}</span>}
          </div>

          <div className="input-group">
            <p className="label-text">Description & Instructions</p>
            <textarea
              name="description"
              placeholder="Enter details and special instructions"
              className={`form-textarea ${formErrors.description ? "error-input" : ""}`}
              onChange={handleChange}
              value={formData.description}
            ></textarea>
            {formErrors.description && <span className="error-text">{formErrors.description}</span>}
          </div>

          <div className="attachments-section">
            <p className="label-text">Attachments (Optional)</p>
            <label htmlFor="file-upload" className="attachment-box">
              <FaPaperclip className="attachment-icon" />
              <p>{file ? file.name : "Click to upload a file"}</p>
              <p className="max-file-size">Max file size: 10MB</p>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="file-input"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>

        </div>

        <div className="action-buttons">
          <button className="btn cancel-btn" onClick={() => toclose(false)}>
            Cancel
          </button>
          <button className="btn post-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? "Posting..." : "Post Errand"}
          </button>
        </div>
      </div>
    </div >
  );
};

export default ModalErrand;