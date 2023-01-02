import React, { useState } from "react";
import StepOtp from "../Steps/StepOtp/StepOtp";
import StepPhoneEmail from "../Steps/StepPhoneEmail/StepPhoneEmail";

const steps = {
  1: StepPhoneEmail,
  2: StepOtp,
};
const Authenticate = () => {
  const [step, setStep] = useState(1); //can interchange the states explicitly
  const Step = steps[step];
  function onNext() {
    setStep(step + 1);
  }

  return (
    <div>
      <Step onNext={onNext} />
      {/*prop drilling in React passing it from here to its children components */}
    </div>
  );
};

export default Authenticate;
