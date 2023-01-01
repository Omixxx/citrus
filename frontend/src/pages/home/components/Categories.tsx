import { IonList, IonItem, IonSelect, IonSelectOption } from "@ionic/react";
function Categories(props: { categories: string[] }) {
  return (
    <IonList>
      <IonItem>
        <IonSelect interface="popover" placeholder="Select a Category">
          {getCategories()}
        </IonSelect>
      </IonItem>
    </IonList>
  );

  function getCategories() {
    return props.categories.map((category) => (
      <IonSelectOption value={category}>{category}</IonSelectOption>
    ));
  }
}

export default Categories;
