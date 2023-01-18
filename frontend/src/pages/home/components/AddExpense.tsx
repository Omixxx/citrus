import { useContext, useEffect, useState } from "react";
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
import addExpense from "../../../services/account/addExpense";
import { getExpenseCategories } from "../../../services/categories/getExpenseCategories";
import { BalanceContext } from "../../../context/Context";

const Modal = ({
  onDismiss,
}: {
  onDismiss: (
    data?: string | null | undefined | number | {},
    role?: string
  ) => void;
}) => {
  const [expense, setExpense] = useState<number | undefined>(undefined);
  const [chosenCategoryId, setChosenCategoryId] = useState<number | undefined>(
    undefined
  );
  const [date, setDate] = useState<Date>(new Date(Date.now()));
  const [categories, setCategories] = useState<[{}]>([{}]);

  useEffect(() => {
    const getExpCategories = async () => {
      try {
        const cagegories = await getExpenseCategories();
        setCategories(cagegories);
      } catch (err) {
        alert(`error while fetching categories from the server: ${err}`);
        onDismiss(null, "cancel");
      }
    };
    getExpCategories();
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
          <IonTitle class="ion-text-center">Add Your Expense</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() =>
                onDismiss({ expense, chosenCategoryId, date }, "confirm")
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
              setExpense(money);
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

function AddExpense() {
  const [present, dismiss] = useIonModal(Modal, {
    onDismiss: (data: string, role: string) => dismiss(data, role),
  });

  const { setBalance } = useContext(BalanceContext);
  function openModal() {
    present({
      onWillDismiss: async (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === "confirm") {
          const { expense, chosenCategoryId, date } = ev.detail.data;
          if (expense && chosenCategoryId && date) {
            const result = await addExpense(expense, chosenCategoryId, date);
            if (result) {
              alert(result.balance);
              return setBalance(result.balance);
            }
            return alert(`Error while adding expense`);
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
          backgroundColor: "#A12568",
        }}
        onClick={() => openModal()}
      >
        Add Expense
      </IonButton>
    </>
  );
}

export default AddExpense;
