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
} from "@ionic/react";
import { OverlayEventDetail } from "@ionic/core/components";
import Categories from "./Categories";
import DateDialog from "./DateDialog";
import MoneyInput from "./MoneyInput";
import { getIncomeCategories } from "../../../services/categories/getIncomeCategories";

const Modal = ({
  onDismiss,
}: {
  onDismiss: (
    data?: string | null | undefined | number | {},
    role?: string
  ) => void;
}) => {
  const [income, setIncome] = useState<number | undefined>(undefined);
  const [chosenCategory, setChosenCategory] = useState<string | undefined>(
    undefined
  );
  const [date, setDate] = useState<Date>(new Date(Date.now()));
  const [categories, setCategories] = useState<string[]>(["lucio"]);
  const categories$ = getIncomeCategories();
  categories$.subscribe((categories: any) => setCategories(categories));
  alert(categories);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => onDismiss(null, "cancel")}>
              Cancel
            </IonButton>
          </IonButtons>
          <IonTitle>Add Your Income</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() =>
                onDismiss(
                  { incomeNumber: income, category: chosenCategory, date },
                  "confirm"
                )
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
            onCategoryChange={(chosenCategory: any) => {
              setChosenCategory(chosenCategory);
            }}
            categories={categories}
          />
        </IonItem>
        <IonItem style={{ paddingLeft: "4%" }}>
          <MoneyInput
            onMoneyChange={(money: number) => {
              setIncome(money);
            }}
          />
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
              `income: ${incomeNumber} \n\ncategory: ${category} \n\ndate: ${date}`
            );
          alert("Please fill out all fields");
          ev.detail.role = "cancel";
        }
      },
    });
  }

  return (
    <>
      <IonButton
        expand="block"
        class="round"
        style={{
          backgroundColor: "#23b4b6",
        }}
        onClick={() => openModal()}
      >
        Add Income
      </IonButton>
    </>
  );
}

export default AddIncome;
