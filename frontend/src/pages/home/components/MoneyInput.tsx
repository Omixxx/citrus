import { IonInput } from "@ionic/react";
import { Money } from "../../../utils/Money";

export default function MoneyInput(props: any) {
  const handleInputChanges = props.onMoneyChange;
  return (
    <IonInput
      type="number"
      style={{ textAlign: "center" }}
      placeholder="€ 0.00"
      inputmode="numeric"
      onIonChange={(e: any) => {
        e.target.value = Money.inputSanitizer(e.target.value);
        handleInputChanges(parseInt(e.target.value));
      }}
      min={0}
    ></IonInput>
  );
}
