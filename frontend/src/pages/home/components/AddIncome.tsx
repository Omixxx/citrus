import { useState, useRef } from "react";
import {
  IonButtons,
  IonButton,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonItem,
  useIonModal,
  IonLabel,
  IonInput,
} from "@ionic/react";
import { OverlayEventDetail } from "@ionic/core/components";
import Categories from "./Categories";
import { Money } from "../../../utils/Money";

const Modal = ({
  onDismiss,
}: {
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
}) => {
  const inputRef = useRef<HTMLIonInputElement>(null);
  const [incomeNumber, setIncomeNumber] = useState(0);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="medium" onClick={() => onDismiss(null, "cancel")}>
              Cancel
            </IonButton>
          </IonButtons>
          <IonTitle>Welcome</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => onDismiss(inputRef.current?.value, "confirm")}
            >
              Confirm
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <Categories {...{ categories: ["abbaco", "ciao", "skrt"] }} />
        </IonItem>
        <IonItem>
          <IonInput
            inputmode="numeric"
            type="number"
            value={incomeNumber}
            onIonChange={(e: any) => {
              e.target.value = Money.inputSanitizer(e.target.value);
              setIncomeNumber(e.target.value);
            }}
            placeholder="$0"
            min={0}
          ></IonInput>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

function AddIncome() {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [present, dismiss] = useIonModal(Modal, {
    onDismiss: (data: string, role: string) => dismiss(data, role),
  });

  function openModal() {
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === "confirm") {
        }
      },
    });
  }

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Controller Modal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={() => openModal()}>
          Open
        </IonButton>
      </IonContent>
    </>
  );
}

export default AddIncome;
