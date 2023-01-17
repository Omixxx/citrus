import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Signup.css";
import { useState } from "react";
import { FiUserPlus } from "react-icons/fi";
import { useHistory } from "react-router";
import { signup } from "../../services/user/signup";

function Signup() {
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState<boolean>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();

  const validateEmail = (email: string) => {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  };

  const validate = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    setIsValid(false);

    if (value === "") return;

    validateEmail(value) !== null ? setIsValid(true) : setIsValid(false);
  };

  const markTouched = () => {
    setIsTouched(true);
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonToolbar
          className="round"
          style={{
            display: "flex",
            justifyContent: "center",
            alignText: "center",
          }}
        >
          <IonTitle className="ion-text-center">Signup</IonTitle>
        </IonToolbar>
        <div>
          <IonButton
            slot="start"
            size="small"
            fill="clear"
            onClick={() => {
              history.push("/login");
            }}
          >
            back
          </IonButton>
        </div>
        <div className="ion-text-center" style={{ paddingTop: "3%" }}>
          <FiUserPlus size="3%" />
        </div>
        <div className="pad">
          <IonItem fill="solid" className=" round">
            <IonLabel position="floating">Username</IonLabel>
            <IonInput
              value={username}
              placeholder="Username"
              onIonChange={(event) => {
                setUsername(event.detail.value!);
              }}
            />
          </IonItem>
        </div>

        <div className="pad">
          <IonItem
            fill="solid"
            className={`${isValid && "ion-valid"} ${isValid === false && "ion-invalid"
              } ${isTouched && "ion-touched"} round`}
          >
            <IonLabel position="floating">Email</IonLabel>
            <IonInput
              type="email"
              value={email}
              onIonInput={(event) => validate(event)}
              onIonBlur={() => markTouched()}
              onIonChange={(event) => {
                setEmail(event.detail.value!);
              }}
            />
            <IonNote slot="error">Invalid email</IonNote>
          </IonItem>
        </div>

        <div className="pad">
          <IonItem fill="solid" className="round">
            <IonLabel position="floating">Password</IonLabel>
            <IonInput
              type="password"
              value={password}
              placeholder="Password"
              onIonChange={(event) => {
                setPassword(event.detail.value!);
              }}
            />
          </IonItem>
        </div>

        <div className="pad">
          <IonItem fill="solid" className="round">
            <IonLabel position="floating">Confirm Password</IonLabel>
            <IonInput
              type="password"
              value={confirmedPassword}
              placeholder="Password"
              onIonChange={(event) => {
                setConfirmPassword(event.detail.value!);
              }}
            />
          </IonItem>
        </div>
        <IonButton
          style={{
            display: "block",
            paddingLeft: "40%",
            paddingRight: "40%",
            marginTop: "30px",
          }}
          onClick={() => {
            signup(
              username,
              email,
              isValid,
              password,
              confirmedPassword,
              history
            );
          }}
        >
          Signup
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default Signup;
