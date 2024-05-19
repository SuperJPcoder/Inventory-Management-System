import Lottie from "react-lottie";
import animationData from "./home.json";

import React from "react";

export default function Homelottie() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div style={{marginLeft:0}}>
<Lottie options={defaultOptions} height={500} width={500} />
    </div> 
  
  );
}
