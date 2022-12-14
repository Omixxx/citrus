import {
  IonCol,
  IonHeader,
  IonIcon,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { log } from "console";
import React, { useState } from "react";
import { CustomIonicButton } from "./components/customIonicButton";
import { CustomIonicInput } from "./components/CustomIonicInput";
import "./Login.css";

// react functional components do not have state, so we need to use hooks to manage state
// this is a similar concept to using a class component
const Login: React.FC = () => {
  //useState is a hook (a function that allows the component to use various features)
  //in this case allow the component to use state and remember the value of the username and password

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle class="ion-text-center">Login</IonTitle>
      </IonToolbar>
      <IonRow>
        <IonCol>
          <IonIcon name="./assets/person-svgrepo-com.svg"></IonIcon>
        </IonCol>
      </IonRow>
      <CustomIonicInput
        label="Email"
        type="email"
        value={email}
        onIonChange={(e: any) => setEmail(e.detail.value!)}
      />
      <CustomIonicInput
        label="Password"
        type="password"
        value={password}
        onIonChange={(e: any) => setPassword(e.detail.value!)}
      />
      <CustomIonicButton
        onClick={() =>
          login(email, password) ? routeToHome() : alert("invalid credentials")
        }
        disabled="false"
        label="Login"
      />
      <div className="ion-text-center">don't have an account?</div>
      <div className="ion-text-center">
        <a href="/register">Register</a>
      </div>
    </IonHeader>
  );
};

function login(email: string, password: string): boolean {
  console.log(email);
  console.log(password);
  return false;
}

function routeToHome() {
  console.log("route");
}

export default Login;
