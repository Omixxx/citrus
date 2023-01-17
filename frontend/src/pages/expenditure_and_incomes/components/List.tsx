import { IonChip, IonItem, IonLabel, IonList } from "@ionic/react";
import { isoTOddmmyyyy } from "../../../utils/isoToUeDateConvertion";

function List({ expenses, incomes }: any) {
  return (
    <IonList>
      <IonItem>
        <IonLabel>{generateList()}</IonLabel>
      </IonItem>
    </IonList>
  );

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
}

export default List;
