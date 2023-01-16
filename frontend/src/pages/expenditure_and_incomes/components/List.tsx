import { IonItem, IonLabel, IonList } from "@ionic/react";

function List({ arr }: any) {
  const result = arr.map((str: any) => {
    return (
      <IonItem>
        <IonLabel>{str}</IonLabel>
      </IonItem>
    );
  });
  return <IonList inset={true}>{result}</IonList>;
}

export default List;
