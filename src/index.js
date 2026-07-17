import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  once: false,
});

const title = document.querySelector("title");
const decsciption = document.querySelectorAll("meta")[3];

title.innerText = `${process.env.REACT_APP_AGENT_NAME}: Buy Airtime and Data for all Network. Make payment for DSTV, GoTv`;
decsciption.setAttribute(
  "content",
  `${process.env.REACT_APP_AGENT_NAME} is a website that provides you with easy access to data,Buy Cheap Internet Data Plan and Airtime Recharge`
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

reportWebVitals();
