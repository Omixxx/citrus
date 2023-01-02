import { IonList, IonItem, IonSelect, IonSelectOption } from "@ionic/react";
function Categories(props: any) {
  const categories = props.categories;
  const handleCategoryChange = props.onCategoryChange;
  return (
    <IonList>
      <IonItem>
        <IonSelect
          interface="popover"
          placeholder="Select a Category"
          onIonChange={(e) => {
            handleCategoryChange(e.detail.value);
          }}
        >
          {getCategories()}
        </IonSelect>
      </IonItem>
    </IonList>
  );

  function getCategories() {
    return categories.map((category: any) => (
      <IonSelectOption value={category}>{category}</IonSelectOption>
    ));
  }
}

export default Categories;
