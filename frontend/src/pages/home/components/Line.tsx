export const Line = (props: { numberOfLines: number }) => {
  const lineXposition = 10;
  const lineYposition = -15;
  return (
    <>
      <svg width="100%" height="70%">
        {generateLines(props.numberOfLines, lineXposition, lineYposition)}
      </svg>
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
              stroke="black"
              strokeWidth="2"
              stroke-dasharray="5, 5"
              fill="none"
            />
          </svg>
          <text x="60" y="65" fill="black" font-size="16" text-anchor="middle">
            afsjfkjas
          </text>
        </g>
      );
      lineYposition += 50;
    }
    return elements;
  }
};
