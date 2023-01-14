import {
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
import { useEffect, useState } from "react";
import { getBalance } from "../../services/account/getBalance";
import { Line } from "./components/Line";
import "./Home.css";
import AddIncome from "./components/AddIncome";

const Home: React.FC = () => {
  const [balance, setBalance] = useState(0);
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
          <AddIncome
            onIncomeAdd={(income: number) => {
              setBalance(income);
            }}
          />
        </IonButtons>
      </IonContent>
    </IonPage>
  );
};

export default Home;
