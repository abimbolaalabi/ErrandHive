import React from "react";
import "./NewHero.css";

const NewHero = () => {
  return (
    <section className="newhero-section">
      <div className="newhero-inner">

        <div className="newhero-left">
          <h2 className="newhero-title">About ErrandHive</h2>

          <p className="newhero-text">
            ErrandHive is a peer to peer errands and delivery platform that connects 
            individuals who need tasks done with trusted local Runners ready to help. 
            We’re redefining convenience through verified profiles, secure payments, 
            and community driven reliability. Whether it’s picking up groceries, 
            dropping off documents, or handling everyday errands, ErrandHive makes 
            getting help or earning simple, safe, and flexible.
          </p>
        </div>

        <div className="newhero-right">
          <img
            className="newhero-image"
            src="https://res.cloudinary.com/dwzomhflw/image/upload/v1761053105/Frame_427319003_ci7avt.jpg"
            alt="ErrandHive team"
          />
        </div>

      </div>
    </section>
  );
};

export default NewHero;
