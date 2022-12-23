import { IonButton, IonCol, IonRow } from "@ionic/react";
import "./CustomIonicButton.css";
export function CustomIonicButton(props: any) {
  return (
    <div className="pad">
      <IonRow>
        <IonCol>
          <IonButton
            expand="block"
            color="primary"
            onClick={props.onClick}
            disabled={props.disabled}
          >
            {props.label}
          </IonButton>
        </IonCol>
      </IonRow>
    </div>
  );
}
