import {
  IonCol,
  IonHeader,
  IonIcon,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { CustomIonicInput } from "../../components/CustomIonicInput";
import { CustomIonicButton } from "../../components/CustomIonicButton";
import "./Login.css";
import axios from "axios";
import { storeJwt } from "../../services/jwt";

// react functional components do not have state, so we need to use hooks to manage state
// this is a similar concept to using a class component
const Login: React.FC = () => {
  //useState is a hook (a function that allows the component to use various features)
  //in this case allow the component to use state and remember the value of the username and password

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle class="ion-text-center">Login</IonTitle>
      </IonToolbar>
      <IonRow>
        <IonCol>
          <IonIcon name="./assets/person-svgrepo-com.svg" />
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
        onClick={() => login(email, password)}
        disabled="false"
        label="Login"
      />
      <div className="ion-text-center">don't have an account?</div>
      <div className="ion-text-center">
        <a href="/signup">Register</a>
      </div>
    </IonHeader>
  );
};

function login(email: string, password: string) {
  axios
    .post(
      ` http://localhost:${process.env.REACT_APP_BACKEND_PORT}/user/login`,
      {
        email: email,
        password: password,
      }
    )
    .then((res) => {
      alert(`User logged in successfully ${res.status}`);
      alert(`token is ${res.data.token}`);
      storeJwt(res.data.token);
    })
    .catch(() => {
      alert(`invalid credentials`);
    });
}

export default Login;
