import { useState } from "react";
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
  IonInput,
} from "@ionic/react";
import { OverlayEventDetail } from "@ionic/core/components";
import Categories from "./Categories";
import { Money } from "../../../utils/Money";

const Modal = ({
  onDismiss,
}: {
  onDismiss: (
    data?: string | null | undefined | number | {},
    role?: string
  ) => void;
}) => {
  const [incomeNumber, setIncomeNumber] = useState<string | undefined>(
    undefined
  );
  const [category, setCategory] = useState<string | undefined>(undefined);

  function handleCategoryChange(category: string) {
    setCategory(category);
  }

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
              onClick={() => onDismiss({ incomeNumber, category }, "confirm")}
            >
              Confirm
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <Categories
            onCategoryChange={handleCategoryChange}
            categories={["avvi", "afaf"]}
          />
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
            placeholder="$ 0"
            min={0}
          ></IonInput>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

function AddIncome() {
  const [present, dismiss] = useIonModal(Modal, {
    onDismiss: (data: string, role: string) => dismiss(data, role),
  });

  function openModal() {
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === "confirm") {
          const { incomeNumber, category } = ev.detail.data;
          if (incomeNumber && category)
            return alert(
              ` incomeNumber: ${incomeNumber} category: ${category}`
            );
          alert("Please fill out all fields");
          ev.detail.role = "cancel";
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
