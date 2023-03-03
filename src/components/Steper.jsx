import React, { useState } from "react";
import ConfirmOrder from "./ConfirmOrder";
import ConfirmPayment from "./ConfirmPayment";

export default function Steper() {
  const [step, setStep] = useState(1);
  if (step == 1) {
    return <ConfirmOrder next={() => setStep(2)} />;
  } else if (step == 2) {
    return <ConfirmPayment back={() => setStep(1)} />;
  } else {
    throw new Error("invalid step number");
  }
}
