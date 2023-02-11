import "../../Styles/toMany/Result.sass";

const CreditResult = ({ myMoney, odsSum, rpkSum, ersp }) => {
  const result = [
    {
      id: 0,
      content: "Dostaniesz: ",
      score: myMoney(),
    },
    {
      id: 1,
      content: "Odsetki cię wyniosą: ",
      score: odsSum,
    },
    {
      id: 2,
      content: "Łącznie oddasz Bankowi: ",
      score: rpkSum,
    },
    {
      id: 3,
      content:
        "Efektywna / Rzeczywista Roczna Stopa Procentowa (ERSP / RRSO) = ",
      score: ersp,
      extra: " %",
    },
  ];
  return (
    <div className="result">
      {result.map((el) => {
        return (
          <p key={el.id} className="result__item">
            {el.content} {parseFloat(el.score).toFixed(2)}
            {el.extra}
          </p>
        );
      })}
    </div>
  );
};
export default CreditResult;
