import React, { useContext, useEffect, useState } from "react";
import {
  IonButton,
  IonChip,
  IonContent,
  IonHeader,
  IonInfiniteScroll,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
} from "@ionic/react";
import getIncomes from "../../services/income/getIncomes";
import getExpenses from "../../services/expense/getExpenses";
import { isoTOddmmyyyy } from "../../utils/isoToUeDateConvertion";
import "./ExpenditureAndIncome.css";
import { useHistory } from "react-router";
import { BalanceContext } from "../../context/Context";

const ExpenditureAndIncome: React.FC = () => {
  const { balance } = useContext(BalanceContext);
  const [effectCompleted, setEffectCompleted] = useState(false);
  const [expenses, setExpenses] = React.useState<Object[]>([]);
  const [incomes, setIncomes] = React.useState<Object[]>([]);
  const [view, setView] = React.useState<string>("");
  const history = useHistory();

  useEffect(() => {
    const fetch = async () => {
      const expenses = await getExpenses();
      const incomes = await getIncomes();
      addTypeProperty("income", incomes, setIncomes);
      addTypeProperty("expense", expenses, setExpenses);
      setEffectCompleted(true);
    };
    fetch();
  }, [balance]);

  if (effectCompleted) {
    return (
      <IonPage>
        <IonContent>
          {/*-- Default back button --*/}
          <IonHeader>
            <IonButton
              onClick={() => {
                history.push("/home");
              }}
            >
              back
            </IonButton>
          </IonHeader>
          <IonList inset={true}>{generateList()}</IonList>;
          <IonInfiniteScroll></IonInfiniteScroll>
        </IonContent>
      </IonPage>
    );
  } else {
    return <div>...Loading</div>;
  }

  function generateList() {
    if (expenses.length === 0 || incomes.length === 0)
      return <IonItem>No data</IonItem>;

    const mergedList = mergeAndSort(expenses, incomes);
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

  function mergeAndSort(listOfExpense: any, listOfIncome: any) {
    let mergedList = listOfExpense.concat(listOfIncome);

    return mergedList.sort((a: any, b: any) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }

  function addTypeProperty(type: string, list: any, setList: any) {
    let mylist: Object[] = [];
    list.forEach((item: any) => {
      mylist.push({
        ...item,
        type: type,
      });
    });
    setList(mylist);
  }
};

export default ExpenditureAndIncome;
