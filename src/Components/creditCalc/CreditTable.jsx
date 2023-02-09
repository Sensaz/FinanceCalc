import "../../Styles/Table.sass";
import React from "react";
const CreditTable = ({
  arrRkRef,
  arraysRk,
  isActive,
  dateValue,
  commission,
  creditValue,
  i,
  rrsoValue,
  interestStatus,
}) => {
  let odsSum = 0;
  let rpkSum = 0;
  if (interestStatus === "interestBottom") {
    arraysRk[1].current.forEach((element) => {
      odsSum += element;
    });
  } else {
    odsSum = creditValue * (rrsoValue / 100);
  }

  if (interestStatus === "interestBottom") {
    arraysRk[3].current.forEach((element) => {
      rpkSum += element;
    });
  } else {
    arraysRk[3].current.forEach((element) => {
      rpkSum += element;
    });
    rpkSum += odsSum;
  }

  const myMoney = () => {
    if (interestStatus === "interestTop")
      return creditValue - commission - creditValue * (rrsoValue / 100);
    else return creditValue - commission;
  };

  const ersp = ((Math.pow(1 + i, dateValue) - 1) * 100).toFixed(2);

  return (
    <>
      {isActive ? (
        <>
          <table>
            <thead>
              <tr>
                <th>Rata Numer:</th>
                <th>Saldo Początkowe długu</th>
                <th>Odsetki</th>
                <th>Rata Kapitałowa</th>
                <th>Rata Płatności Kredytu</th>
                <th>Saldo Końcowe Długu</th>
              </tr>
            </thead>
            <tbody>
              {arrRkRef.current.map((_, index) => (
                <tr key={index}>
                  <td key={index + Math.random() * 300}>{index + 1}</td>
                  {arraysRk.map((el) => (
                    <td key={index + Math.random() * 300}>
                      {el.current[index].toFixed(2)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <span>Dostaniesz: {myMoney().toFixed(2)}</span>
            <span>Odsetki cię wyniosą: {odsSum.toFixed(2)}</span>
            <span>Łącznie oddasz Bankowi: {rpkSum.toFixed(2)}</span>
            <span>
              Efektywna / Rzeczywista Roczna Stopa Procentowa (ERSP / RRSO) ={" "}
              {ersp} %
            </span>
          </div>
        </>
      ) : null}
    </>
  );
};

export default React.memo(CreditTable);
