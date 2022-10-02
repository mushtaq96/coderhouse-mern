import React, { useState } from "react";
import Button from "../../../components/shared/Button/Button";
import Card from "../../../components/shared/Card/Card";
import TextInput from "../../../components/shared/TextInput/TextInput";
import styles from "./StepOtp.module.css";

const StepOtp = ({ onNext }) => {
  const [otp, setOtp] = useState("");
  function next() {}
  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title="enter the code we sent it to you" icon="lock-emoji">
          <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />

          <div className={styles.actionButtonWrap}>
            <Button onClick={next} text="Next" />
          </div>
          <p className={styles.bottomParagraph}>
            By entering your number, you are agreeing to our terms of service
            and privacy policay. Thanks
          </p>
        </Card>
      </div>
    </>
  );
};

export default StepOtp;
