import React, { useContext, useEffect, useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInfiniteScroll,
  IonPage,
} from "@ionic/react";
import getIncomes from "../../services/income/getIncomes";
import getExpenses from "../../services/expense/getExpenses";
import "./ExpenditureAndIncome.css";
import { useHistory } from "react-router";
import { BalanceContext } from "../../context/Context";
import List from "./components/List";

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
      addTypeProperty("expense", expenses, setExpenses);
      addTypeProperty("income", incomes, setIncomes);
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
          <List expenses={expenses} incomes={incomes} />
          <IonInfiniteScroll></IonInfiniteScroll>
        </IonContent>
      </IonPage>
    );
  } else {
    return <div>...Loading</div>;
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
