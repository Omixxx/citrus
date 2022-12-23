import { useState } from "react";
import { IonButton, IonInput, IonItem, IonLabel, IonNote } from "@ionic/react";

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
    if (!areInputValid(username, email, password, confirmedPassword)) return;
    alert("signup");
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
    <>
      <IonItem fill="solid">
        <IonLabel position="floating">Username</IonLabel>
        <IonInput
          value={username}
          placeholder="Username"
          onIonChange={(event) => {
            setUsername(event.detail.value!);
          }}
        ></IonInput>
      </IonItem>

      <IonItem
        fill="solid"
        className={`${isValid && "ion-valid"} ${isValid === false && "ion-invalid"
          } ${isTouched && "ion-touched"}`}
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
        ></IonInput>
        <IonNote slot="error">Invalid email</IonNote>
      </IonItem>

      <IonItem fill="solid">
        <IonLabel position="floating">Password</IonLabel>
        <IonInput
          type="password"
          value={password}
          placeholder="Password"
          onIonChange={(event) => {
            setPassword(event.detail.value!);
          }}
        ></IonInput>
      </IonItem>

      <IonItem fill="solid">
        <IonLabel position="floating">Confirm Password</IonLabel>
        <IonInput
          type="password"
          value={confirmedPassword}
          placeholder="Password"
          onIonChange={(event) => {
            setConfirmPassword(event.detail.value!);
          }}
        ></IonInput>
      </IonItem>
      <IonButton
        onClick={() => {
          signup(username, email, password, confirmedPassword);
        }}
      >
        Signup
      </IonButton>
    </>
  );
}

export default Signup;
