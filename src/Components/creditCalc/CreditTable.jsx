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
}) => {
  let odsSum = 0;
  let rpkSum = 0;
  arraysRk[1].current.forEach((element) => {
    odsSum += element;
  });
  arraysRk[3].current.forEach((element) => {
    rpkSum += element;
  });

  const myMoney = creditValue - commission;
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
            <span>Dostaniesz: {myMoney}</span>
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
