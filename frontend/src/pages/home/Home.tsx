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
import { useState } from "react";
import { Line } from "./components/Line";

import "./Home.css";

const Home: React.FC = () => {
  const [modNumber, setModNumber] = useState(0);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol
              style={{
                paddingLeft: "20%",
                paddingRight: "20%",
                paddingTop: "3%",
                paddingBottom: "10%",
              }}
            >
              <IonCard class="round" style={{ with: "20%", height: "20%" }}>
                <IonCardHeader>
                  <IonCardTitle className="ion-text-center">Saldo</IonCardTitle>
                </IonCardHeader>
                <IonCardContent
                  style={{ fontSize: 30 }}
                  className="ion-text-center"
                >
                  $ 200
                </IonCardContent>
              </IonCard>
              <Line {...{ numberOfLines: parseInt(`${modNumber}`) }} />
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonButton
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
