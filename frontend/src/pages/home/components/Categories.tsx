import { IonList, IonItem, IonSelect, IonSelectOption } from "@ionic/react";
import "./Categories.css";

function Categories(props: any) {
  const categories = props.categories;
  const handleCategoryChange = props.onCategoryChange;
  return (
    <IonItem lines="none" fill="outline" style={{ paddingLeft: "80" }}>
      <IonSelect
        placeholder="category"
        onIonChange={(e) => {
          handleCategoryChange(e.detail.value);
        }}
      >
        {getCategories()}
      </IonSelect>
    </IonItem>
  );

  function getCategories() {
    return categories.map((category: any) => (
      <IonSelectOption value={category.id}>{category.name}</IonSelectOption>
    ));
  }
}

export default Categories;
