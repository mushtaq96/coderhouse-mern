import React from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "../../components/shared/Button/Button";
import Card from "../../components/shared/Card/Card";
import styles from "./Home.module.css";

const Home = () => {
  const signInLinkStyle = {
    color: "rgb(92, 167, 238)",
    fontWeight: "bold",
    textDecoration: "none",
    marginLeft: "10px",
  };

  const history = useHistory();
  function startRegister() {
    history.push("/register");
    console.log("button lcicked");
  }
  return (
    <div className={styles.cardWrapper}>
      <Card title="Welcome to codershouse!!" icon="llogo">
        <p className={styles.text}>
          We’re working hard to get Codershouse ready for everyone! While we
          wrap up the finishing youches, we’re adding people gradually to make
          sure nothing breaks :)
        </p>
        <div>
          <Button onClick={startRegister} text="get your username" />
        </div>
        <div className={styles.signinWrapper}>
          <span className={styles.hasInvite}>Have an invite text?</span>
          <Link style={signInLinkStyle} to="/login">
            Sign In
          </Link>
        </div>
      </Card>
      {/*passing
      these as props*/}
    </div>
  );
};

export default Home;
