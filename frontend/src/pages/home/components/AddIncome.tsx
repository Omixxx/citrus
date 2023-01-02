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
import DateDialog from "./DateDialog";

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
  const [date, setDate] = useState<Date>(new Date(Date.now()));

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
              onClick={() =>
                onDismiss({ incomeNumber, category, date }, "confirm")
              }
            >
              Confirm
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <Categories
            onCategoryChange={(category: any) => {
              setCategory(category);
            }}
            categories={["avvi", "afaf"]}
          />
        </IonItem>
        <IonItem lines="none" style={{ paddingLeft: "4%" }}>
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
        <DateDialog
          date={date}
          setDate={(newDate: Date) => {
            setDate(newDate);
          }}
          dayWindow={30}
        ></DateDialog>
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
          const { incomeNumber, category, date } = ev.detail.data;
          if (incomeNumber && category && date)
            return alert(
              ` incomeNumber: ${incomeNumber} category: ${category} date: ${date}`
            );
          alert("Please fill out all fields");
          ev.detail.role = "cancel";
        }
      },
    });
  }

  return (
    <>
      <IonContent className="ion-padding">
        <IonButton color={"medium"} expand="block" onClick={() => openModal()}>
          Add Income
        </IonButton>
      </IonContent>
    </>
  );
}

export default AddIncome;
