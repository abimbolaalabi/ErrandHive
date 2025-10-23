
import "./ModalSpinner.css";
import { ClipLoader} from "react-spinners";

const ModalSpinner = () => {
 

  return (
    <div className="modal-container">
      <div className="modal-child">
        <div className="spinner-box">
          <ClipLoader color="#8133F1" size={50} speedMultiplier={0.9} />
          <p className="spinner-text">Just a moment</p>
        </div>
      </div>
    </div>
  );
};

export default ModalSpinner;
