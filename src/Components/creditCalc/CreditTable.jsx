import "../../Styles/./toMany/Table.sass";
import CreditResult from "./CreditResult";

import React from "react";
const CreditTable = ({
  capitalRepaymentArr,
  arraysRk,
  isActive,
  dateValue,
  commissionFee,
  creditValue,
  basePeriodInterest,
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
      return creditValue - commissionFee - creditValue * (rrsoValue / 100);
    else return creditValue - commissionFee;
  };

  const ersp = (
    (Math.pow(1 + basePeriodInterest, dateValue) - 1) *
    100
  ).toFixed(2);

  return (
    <>
      {isActive ? (
        <>
          <table className="table">
            <thead>
              <tr className="table__tr">
                <th>Rata Numer:</th>
                <th>Saldo Początkowe długu</th>
                <th>Odsetki</th>
                <th>Rata Kapitałowa</th>
                <th>Rata Płatności Kredytu</th>
                <th>Saldo Końcowe Długu</th>
              </tr>
            </thead>
            <tbody>
              {capitalRepaymentArr.current.map((_, index) => (
                <tr className="table__tr" key={index}>
                  <td className="table__td" key={index + Math.random() * 300}>
                    {index + 1}
                  </td>
                  {arraysRk.map((el) => (
                    <td className="table__td" key={index + Math.random() * 300}>
                      {el.current[index].toFixed(2)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <CreditResult
            myMoney={myMoney}
            odsSum={odsSum}
            rpkSum={rpkSum}
            ersp={ersp}
          />
        </>
      ) : null}
    </>
  );
};

export default React.memo(CreditTable);
