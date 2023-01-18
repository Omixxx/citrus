import { IonButton, IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import { useState } from "react";

export const Line = (props: any) => {
  const [lines, setLines] = useState<number>(0);
  const lineXposition = 10;
  const lineYposition = -15;
  return (
    <>
      <svg width="100%" height="70%">
        {generateLines(lines, lineXposition, lineYposition)}
      </svg>
      <IonButton
        color={"light"}
        style={{
          display: "block",
          margin: "auto",
          paddingLeft: "40%",
          paddingRight: "40%",
        }}
        onClick={() => {
          setLines(lines + 1);
        }}
      >
        <IonIcon icon={add} />
      </IonButton>
    </>
  );

  function generateLines(
    numberOfLines: number,
    lineXPosition: number,
    lineYposition: number
  ) {
    let elements = [];
    for (let line = 1; line <= numberOfLines; line++) {
      elements.push(
        <g
          transform={`translate(${lineXPosition.toString()},
          ${lineYposition.toString()})`}
        >
          <svg width="100%" height="100%">
            <path
              d="M00,00 L00,50 M00,50 Q4,70,20 65,"
              stroke="white"
              strokeWidth="2"
              stroke-dasharray="5, 5"
              fill="none"
            />
          </svg>
          <text x="60" y="65" fill="white" font-size="16" text-anchor="middle">
            afsjfkjas
          </text>
        </g>
      );
      lineYposition += 50;
    }
    return elements;
  }
};
