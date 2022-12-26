import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
} from "@ionic/react";
import axios from "axios";
import "./Signup.css";
import { useState } from "react";

function Signup() {
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState<boolean>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const validateEmail = (email: string) => {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  };

  const validate = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    setIsValid(undefined);

    if (value === "") return;

    validateEmail(value) !== null ? setIsValid(true) : setIsValid(false);
  };

  const markTouched = () => {
    setIsTouched(true);
  };

  function signup(
    username: string,
    email: string,
    password: string,
    confirmedPassword: string
  ) {
    if (areInputValid(username, email, password, confirmedPassword)) {
      axios
        .post(
          `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/user/signup`,
          { username: username, email: email, password: password }
        )
        .then((res) => {
          alert(`User created successfully ${res.status}`);
        })
        .catch((error) => {
          alert(`an error occurred ${error}`);
        });
    }
  }

  function areInputValid(
    username: string,
    email: string,
    password: string,
    confirmedPassword: string
  ): boolean {
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmedPassword === ""
    ) {
      alert("Please fill in all fields");
      return false;
    }
    if (password !== confirmedPassword) {
      alert("Passwords don't match!!");
      return false;
    }
    if (isValid === false) {
      alert("Please enter a valid email address");
      return false;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return false;
    }
    return true;
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonItem fill="solid" className="pad">
          <IonLabel position="floating">Username</IonLabel>
          <IonInput
            value={username}
            placeholder="Username"
            onIonChange={(event) => {
              setUsername(event.detail.value!);
            }}
          />
        </IonItem>

        <IonItem
          fill="solid"
          className={`${isValid && "ion-valid"} ${isValid === false && "ion-invalid"
            } ${isTouched && "ion-touched"} pad`}
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

        <IonItem fill="solid" className="pad">
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

        <IonItem fill="solid" className="pad">
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
        <IonButton
          style={{
            display: "block",
            paddingLeft: "40%",
            paddingRight: "40%",
            marginTop: "30px",
          }}
          onClick={() => {
            signup(username, email, password, confirmedPassword);
          }}
        >
          Signup
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default Signup;
