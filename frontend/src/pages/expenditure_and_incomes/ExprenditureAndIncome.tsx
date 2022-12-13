import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/react";
import List from "../../components/List";
import "./ExpenditureAndIncome.css";

// todo: fetch from backend
let myList: string[] = ["cip", "ciop", "ciap"];

//ritorna una lista di nomi

const ExpenditureAndIncome: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">income</IonTitle>
          </IonToolbar>
        </IonHeader>
        <List arr={myList}></List>
        <div className="center">
          <IonButton>il bottone</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ExpenditureAndIncome;
