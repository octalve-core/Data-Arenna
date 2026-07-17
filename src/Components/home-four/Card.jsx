import React from "react";

const Card = ({ image, title, titlee, text, imagee, backgroundColor }) => {
  const cardStyle = {
    backgroundColor: backgroundColor,
  };

  const imageStyle = {
    width: "80px",
    height: "auto",
  };
  const imageStylee = {
    width: "50px",
    height: "auto",
  };

  return (
    <div
      className="card p-5  rounded-2xl transition-transform hover:scale-105 duration-300 ease-in "
      style={cardStyle}
    >
      <img src={image} alt={title} style={imageStyle} />
      <h4 className="mt-3 font-bold">{title}</h4>
      <p>{text}</p>
      <div>
        <img src={imagee} alt={titlee} style={imageStylee} />
      </div>
    </div>
  );
};

export default Card;
