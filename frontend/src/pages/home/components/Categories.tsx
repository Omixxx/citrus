import { IonItem, IonSelect, IonSelectOption } from "@ionic/react";
import "./Categories.css";

function Categories(props: any) {
  const categories = props.categories;
  const handleCategoryChange = props.onCategoryChange;
  return (
    <IonItem
      className="pad"
      lines="none"
      fill="outline"
      style={{
        width: "100%",
      }}
    >
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
