import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
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
import { formatValue } from "react-currency-input-field";

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
          <IonRow style={{ height: "60%" }}>
            <IonCol>
              <IonCard class="round">
                <IonCardContent
                  style={{
                    color: "#D8D8D8",
                    textAlign: "center",
                    fontSize: "1.7rem",
                    font: "Courier New",
                    fontWeight: "bold",
                  }}
                  className="ion-text-center"
                >
                  {formatValue({
                    value: balance?.toString(),
                    groupSeparator: ",",
                    decimalSeparator: ".",
                    prefix: "€",
                  })}
                </IonCardContent>
              </IonCard>
              <Line />
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonButtons>
          <AddIncome />
          <IonButton
            style={{
              width: "100%",
              color: "#5454C5",
            }}
            onClick={() => {
              history.push("/expenditure_and_incomes");
            }}
          >
            Transactions
          </IonButton>
          <AddExpense />
        </IonButtons>
      </IonContent>
    </IonPage>
  );
};

export default Home;
