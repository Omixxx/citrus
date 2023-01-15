import { IonInput } from "@ionic/react";
import { Money } from "../../../utils/Money";

export default function MoneyInput(props: any) {
  const handleInputChanges = props.onMoneyChange;
  return (
    <IonInput
      inputmode="numeric"
      type="number"
      onIonChange={(e: any) => {
        e.target.value = Money.inputSanitizer(e.target.value);
        handleInputChanges(parseInt(e.target.value));
      }}
      placeholder="$ 0"
      min={0}
    ></IonInput>
  );
}
