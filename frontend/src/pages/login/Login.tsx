import { IonContent, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { BiLogIn } from "react-icons/bi";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { login } from "../../services/user/login";
import { CustomIonicInput } from "./components/CustomIonicInput";
import { CustomIonicButton } from "./components/CustomIonicButton";
port "./Login.css";

// react functional components do not have state, so we need to use hooks to manage state
// this is a similar concept to using a class component
const Login: React.FC = () => {
  //useState is a hook (a function that allows the component to use various features)
  //in this case allow the component to use state and remember the value of the username and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  return (
    <IonPage>
      <IonContent>
        <IonToolbar>
          <IonTitle class="ion-text-center">Login</IonTitle>
        </IonToolbar>
        <div className="ion-text-center" style={{ paddingTop: "3%" }}>
          <BiLogIn size="3%" />
        </div>
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
          onClick={() => login(email, password, history)}
          disabled="false"
          label="Login"
        />
        <div className="ion-text-center">don't have an account?</div>
        <div className="ion-text-center">
          <Link to="/signup">Register</Link>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
