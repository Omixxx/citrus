import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
} from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import { getBalance } from "../../services/account/getBalance";
import { Line } from "./components/Line";
import "./Home.css";
import AddIncome from "./components/AddIncome";
import AddExpense from "./components/AddExpense";
import { useHistory } from "react-router";
import { BalanceContext } from "../../context/Context";

const Home: React.FC = () => {
  const { balance, setBalance } = useContext(BalanceContext);
  const history = useHistory();

  useEffect(() => {
    async function init() {
      setBalance(await getBalance());
    }
    init();
  }, [balance]);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonGrid style={{ height: "80%" }}>
          <IonRow style={{ height: "65%" }}>
            <IonCol>
              <IonCard class="round">
                <IonCardHeader>
                  <IonCardTitle className="ion-text-center">
                    {`€ ${balance}`}
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent
                  style={{ fontSize: 30 }}
                  className="ion-text-center"
                ></IonCardContent>
              </IonCard>
              <Line />
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonButtons>
          <IonButton
            color="secondary"
            onClick={() => {
              history.push("/expenditure_and_incomes");
            }}
          >
            Transactions
          </IonButton>
          <AddIncome
            onIncomeAdd={(newBalance: number) => {
              setBalance(newBalance);
            }}
          />
          <AddExpense
            onExpenseAdd={(newBalance: number) => {
              setBalance(newBalance);
            }}
          />
        </IonButtons>
      </IonContent>
    </IonPage>
  );
};

export default Home;
