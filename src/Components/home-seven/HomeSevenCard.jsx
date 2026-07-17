import React from "react";

const HomeSevenCard = ({
  image,
  imagee,
  title,
  text,
  buttonText,
  arrow,
  backgroundColor,
}) => {
  const cardStyle = {
    backgroundColor: backgroundColor,
    width: "280px",
    height: "425px",
  };

  const imageStyle = {
    width: "100%",
    height: "auto",
  };
  const imageStylee = {
    width: "40px",
    height: "auto",
  };
  return (
    <div
      className="card rounded-lg transition-transform hover:scale-105 duration-300 ease-in "
      style={cardStyle}
    >
      <img
        className=" rounded-t-lg"
        src={image}
        alt={title}
        style={imageStyle}
      />
      <div className="relative left-64 bottom-5">
        <img src={imagee} alt="" style={imageStylee} />
      </div>
      <div className="grid relative top-[-30px] p-3">
        <h4 className="mt-3 font-bold">{title}</h4>
        <p>{text}</p>
        <div className="flex justify-start items-center space-x-3">
          <button className=" text-homesevenbtn">{buttonText}</button>
          <img className=" w-4 h-4" src={arrow} alt="" />
        </div>
      </div>
    </div>
  );
};

export default HomeSevenCard;
