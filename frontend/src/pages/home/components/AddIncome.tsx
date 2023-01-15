import { useEffect, useState } from "react";
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
import { addIncome } from "../../../services/account/addIncome";

const Modal = ({
  onDismiss,
}: {
  onDismiss: (
    data?: string | null | undefined | number | {},
    role?: string
  ) => void;
}) => {
  const [income, setIncome] = useState<number | undefined>(undefined);
  const [chosenCategoryId, setChosenCategoryId] = useState<number | undefined>(
    undefined
  );
  const [date, setDate] = useState<Date>(new Date(Date.now()));
  const [categories, setCategories] = useState<[{}]>([{}]);

  useEffect(() => {
    const getIncCategories = async () => {
      try {
        const cagegories = await getIncomeCategories();
        setCategories(cagegories);
      } catch (err) {
        alert(`error while fetching categories from the server: ${err}`);
        onDismiss(null, "cancel");
      }
    };
    getIncCategories();
  }, []);

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
                onDismiss({ income, chosenCategoryId, date }, "confirm")
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
              setChosenCategoryId(chosenCategory);
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

function AddIncome(props: any) {
  const [present, dismiss] = useIonModal(Modal, {
    onDismiss: (data: string, role: string) => dismiss(data, role),
  });
  const onIncomeAdd = props.onIncomeAdd;

  function openModal() {
    present({
      onWillDismiss: async (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === "confirm") {
          const { income, chosenCategoryId, date } = ev.detail.data;
          if (income && chosenCategoryId && date) {
            const result = await addIncome(income, chosenCategoryId, date);
            if (result) {
              alert(`income added successfully`);
              return await onIncomeAdd(result.balance);
            }
            return alert(`error while adding income`);
          }
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
          backgroundColor: "#18b8b6",
        }}
        onClick={() => openModal()}
      >
        Add Income
      </IonButton>
    </>
  );
}

export default AddIncome;
