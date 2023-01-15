import React, { useEffect } from "react";
import {
  IonBackButton,
  IonButtons,
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
import chalk from "chalk";
import getIncomes from "../../services/income/getIncomes";
import getExpenses from "../../services/expense/getExpenses";
import { isoTOddmmyyyy } from "../../utils/isoToUeDateConvertion";
import "./ExpenditureAndIncome.css";

const ExpenditureAndIncome: React.FC = (props: { view?: string }) => {
  const [expenses, setExpenses] = React.useState<Object[]>([]);
  const [incomes, setIncomes] = React.useState<Object[]>([]);
  const [view, setView] = React.useState<string>("");

  if (props.view) setView(props.view);

  useEffect(() => {
    const fetch = async () => {
      setExpenses(await getExpenses());
      setIncomes(await getIncomes());
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
      return mergeExpenseAndIncome(expenses, incomes, view);
    }
  }

  function mergeExpenseAndIncome(
    listOfExpense: any,
    listOfIncome: any,
    view: string
  ) {
    if (view === "expense") {
      return listOfExpense.map(
        listOfExpense.map((expense: any) => {
          return (
            <IonItem>
              <IonLabel>{expense.id}</IonLabel>
              <IonLabel>{isoTOddmmyyyy(expense.date)}</IonLabel>
              <IonLabel>{chalk.red(expense.amount)}</IonLabel>
            </IonItem>
          );
        })
      );
    }
    if (view === "income") {
      return listOfIncome.map((income: any) => {
        return (
          <IonItem>
            <IonLabel>{income.id}</IonLabel>
            <IonLabel>{isoTOddmmyyyy(income.date)}</IonLabel>
            <IonLabel style={{ color: "green" }}> + {income.amount}</IonLabel>
          </IonItem>
        );
      });
    }
    return listOfExpense.concat(listOfIncome).map((expense: any) => {
      return (
        <IonItem>
          <IonLabel>{expense.id}</IonLabel>
          <IonLabel>{isoTOddmmyyyy(expense.date)}</IonLabel>
          <IonLabel style={{ color: "red" }}> - {expense.amount}</IonLabel>
        </IonItem>
      );
    });
  }
};

export default ExpenditureAndIncome;
