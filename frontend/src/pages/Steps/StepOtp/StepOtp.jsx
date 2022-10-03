import React, { useState } from "react";
import Button from "../../../components/shared/Button/Button";
import Card from "../../../components/shared/Card/Card";
import TextInput from "../../../components/shared/TextInput/TextInput";
import styles from "./StepOtp.module.css";
import { verifyOtp } from "../../../http";
import { useSelector } from "react-redux"; // fetch data from store

const StepOtp = ({ onNext }) => {
  const [otp, setOtp] = useState("");
  const {phone, hash} = useSelector((state)=>state.auth.otp)
  async function submit() {
    try{
      const {data} = await verifyOtp({otp, phone, hash});
      console.log(data); // contains access token
    } catch(e){
      console.log(e);
    }
    // onNext();
  }
  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title="enter the code we sent it to you" icon="lock-emoji">
          <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />

          <div className={styles.actionButtonWrap}>
            <Button onClick={submit} text="Next" />
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
