import React, { useEffect } from "react";
import {
  IonBackButton,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import getIncomes from "../../services/income/getIncomes";
import getExpenses from "../../services/expense/getExpenses";
import { isoTOddmmyyyy } from "../../utils/isoToUeDateConvertion";
import "./ExpenditureAndIncome.css";

const ExpenditureAndIncome: React.FC = () => {
  const [expenses, setExpenses] = React.useState<Object[]>([]);
  const [incomes, setIncomes] = React.useState<Object[]>([]);
  const [view, setView] = React.useState<string>("");

  useEffect(() => {
    const fetch = async () => {
      const expenses = await getExpenses();
      const incomes = await getIncomes();
      addTypeProperty("income", incomes, setIncomes);
      addTypeProperty("expense", expenses, setExpenses);
    };
    fetch();
  }, []);

  return (
    <IonPage>
      <IonContent>
        {/*-- Default back button --*/}
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonList inset={true}>{generateList()}</IonList>;
        <IonInfiniteScroll>
          <IonInfiniteScrollContent
            loadingText="Please wait..."
            loadingSpinner="bubbles"
          ></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );

  function generateList() {
    if (expenses.length !== 0 || incomes.length !== 0) {
      const mergedList = mergeExpenseAndIncome(expenses, incomes);
      return mergedList.map((item: any) => {
        return (
          <IonItem key={item.id}>
            <IonLabel>
              {item.type === "expense" ? (
                <big style={{ color: "red" }}>{` - ${item.amount}`}</big>
              ) : (
                <big style={{ color: "green" }}>{` + ${item.amount}`}</big>
              )}
              <p>{isoTOddmmyyyy(item.date)}</p>
            </IonLabel>
            <IonLabel>
              <IonChip color="primary">Category</IonChip>
            </IonLabel>
          </IonItem>
        );
      });
    }
    return <IonItem>No data</IonItem>;
  }

  function mergeExpenseAndIncome(listOfExpense: any, listOfIncome: any) {
    let mergedList = listOfExpense.concat(listOfIncome);

    return mergedList.sort((a: any, b: any) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }

  function addTypeProperty(type: string, list: any, setList: any) {
    const mylist = list;
    mylist.forEach((item: any) => {
      return {
        ...item,
        type: type,
      };
    });
    setList(mylist);
  }
};

export default ExpenditureAndIncome;
