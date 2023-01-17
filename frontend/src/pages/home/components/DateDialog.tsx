import { useRef } from "react";
import {
  IonButton,
  IonModal,
  IonContent,
  IonItem,
  IonDatetime,
} from "@ionic/react";
import "./DateDialog.css";

function DateDialog(props: any) {
  const modal = useRef<HTMLIonModalElement>(null);
  const { date, setDate, dayWindow } = props;
  const today = new Date(Date.now());

  return (
    <IonContent class="ion-padding">
      <IonButton
        id="open-custom-dialog"
        color={"dark"}
        expand="block"
        class="ion-text-start"
      >
        {date.toDateString()}
      </IonButton>
      <IonModal id="example-modal" ref={modal} trigger="open-custom-dialog">
        <div className="wrapper">
          <h1 className="ion-text-center">Date</h1>
          <IonItem lines="none">
            <IonDatetime
              presentation="date-time"
              showDefaultButtons={true}
              onIonChange={(e) => {
                if (e.detail.value)
                  setDate(new Date(e.detail.value.toString()));
              }}
              value={date.toISOString()}
              min={new Date(Date.now()).toISOString()}
              max={new Date(
                new Date(Date.now()).setDate(today.getDate() + dayWindow)
              ).toISOString()}
            ></IonDatetime>
          </IonItem>
        </div>
      </IonModal>
    </IonContent>
  );
}

export default DateDialog;
