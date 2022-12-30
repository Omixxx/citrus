import {
  IonButton,
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

const Home: React.FC = () => {
  const [modNumber, setModNumber] = useState(0);
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    async function init() {
      setBalance(await getBalance());
    }
    init();
  }, []);

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

              <Line {...{ numberOfLines: parseInt(`${modNumber}`) }} />
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonButton
          style={{ width: "30%", margin: "auto" }}
          onClick={() => {
            setModNumber(parseInt(`${modNumber}`) + 1);
          }}
        >
          Add
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
