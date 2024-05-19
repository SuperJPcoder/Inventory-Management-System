import Lottie from "react-lottie";
import animationData from "./transactions.json";

import React from "react";

export default function Transactionlottie() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div style={{marginLeft:50}}>
<Lottie options={defaultOptions} height={500} width={500} />
    </div> 
  
  );
}
