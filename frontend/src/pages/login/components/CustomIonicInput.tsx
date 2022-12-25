import { IonCol, IonInput, IonItem, IonLabel, IonRow } from "@ionic/react";
import "./CustomIonicInput.css";

export function CustomIonicInput(props: any) {
  return (
    <IonRow>
      <IonCol>
        <div className="pad">
          <IonItem className="round">
            <IonLabel position="floating">{props.label}</IonLabel>
            <IonInput
              className="round"
              type={props.type}
              value={props.value}
              onIonChange={props.onIonChange}
            ></IonInput>
          </IonItem>
        </div>
      </IonCol>
    </IonRow>
  );
}
