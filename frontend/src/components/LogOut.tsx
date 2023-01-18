import { IonButton } from "@ionic/react";
import { useHistory } from "react-router";
import { removeJwt } from "../services/jwt";

export const LogOut = (props: { style: {} }) => {
  const style = props.style;
  const history = useHistory();
  return (
    <div>
      <IonButton
        style={style}
        fill="clear"
        onClick={() => {
          removeJwt();
          history.replace("/login");
        }}
      >
        {"LogOut"}
      </IonButton>
    </div>
  );
};
