import {
  IonCol,
  IonHeader,
  IonIcon,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { CustomIonicButton } from "./components/customIonicButton";
import { CustomIonicInput } from "./components/CustomIonicInput";
import "./Login.css";

// react functional components do not have state, so we need to use hooks to manage state
// this is a similar concept to using a class component
const Login: React.FC = () => {
  //useState is a hook (a function that allows the component to use various features)
  //in this case allow the component to use state and remember the value of the username and password
  //
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
        onClick={() => console.log("clicked")}
        disabled="false"
        label="Login"
      />
    </IonHeader>
  );
};

export default Login;
