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
  IonIcon,
  IonPage,
  IonRow,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { getBalance } from "../../services/account/getBalance";
import { Line } from "./components/Line";
import "./Home.css";
import { add } from "ionicons/icons";
import AddIncome from "./components/AddIncome";

const Home: React.FC = () => {
  const [oprionNumber, setOprionNumber] = useState(0);
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

              <Line {...{ numberOfLines: parseInt(`${oprionNumber}`) }} />
            </IonCol>
          </IonRow>

          <IonButton
            style={{
              display: "block",
              margin: "auto",
              paddingLeft: "40%",
              paddingRight: "40%",
            }}
            onClick={() => setOprionNumber(parseInt(`${oprionNumber}`) + 1)}
          >
            <IonIcon icon={add} />
          </IonButton>
        </IonGrid>
        <IonButtons>
          <AddIncome />
          <AddIncome />
        </IonButtons>
      </IonContent>
    </IonPage>
  );
};

export default Home;
