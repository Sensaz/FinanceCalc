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
  // Suma odsetek
  let interestSum = 0;
  // Suma Rat Płatności kredytu
  let loanRepaymentSum = 0;
  if (interestStatus === "interestBottom") {
    arraysRk[1].current.forEach((element) => {
      interestSum += element;
    });
  } else {
    interestSum = creditValue * (rrsoValue / 100);
  }

  if (interestStatus === "interestBottom") {
    arraysRk[3].current.forEach((element) => {
      loanRepaymentSum += element;
    });
  } else {
    arraysRk[3].current.forEach((element) => {
      loanRepaymentSum += element;
    });
    loanRepaymentSum += interestSum;
  }

  const myMoney = () => {
    if (interestStatus === "interestTop")
      return creditValue - commissionFee - creditValue * (rrsoValue / 100);
    else return creditValue - commissionFee;
  };

  // Efektywna roczna stopa procentowa
  const CalculateEffectiveAnnualInterestRate = (
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
            interestSum={interestSum}
            loanRepaymentSum={loanRepaymentSum}
            CalculateEffectiveAnnualInterestRate={CalculateEffectiveAnnualInterestRate}
          />
        </>
      ) : null}
    </>
  );
};

export default React.memo(CreditTable);
