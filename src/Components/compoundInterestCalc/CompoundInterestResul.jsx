const CompoundInterestResul = ({
  resultValue,
  timeResultInvesting,
  interestValue,
  additionalContributions,
  interestAdditionalContributions,
}) => {
  const result = [
    {
      id: 0,
      content: `Rezultatem twojej inwestycji będzie kwota: `,
      score: resultValue,
    },
    {
      id: 1,
      content: `Czas trwania inwestycji wyniesie: `,
      score: timeResultInvesting,
    },
    {
      id: 2,
      content: `Zysk z odsetek wyniesie: `,
      score: interestValue,
    },
    {
      id: 3,
      content: `Dodatkowo wpłacisz: `,
      score: additionalContributions,
    },
    {
      id: 4,
      content: `Odsetki z dodatkowych wpłat dadzą: `,
      score: interestAdditionalContributions,
    },
  ];
  return (
    <div id="result">
      {result.map((el) => {
        return (
          <p key={el.id}>
            {el.content}
            {el.score}
          </p>
        );
      })}
    </div>
  );
};
export default CompoundInterestResul;
