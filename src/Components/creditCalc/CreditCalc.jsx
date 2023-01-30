import "../../Styles/CreditCalc.sass";
import React, { useState, useRef } from "react";
import CreditTable from "./CreditTable";
import CreditForm from "./CreditForm";

const CreditCalc = () => {
  const [creditValue, setCreditValue] = useState(10000);
  const [dateValue, setDateValue] = useState(12);
  const [rrsoValue, setRrsoValue] = useState(12);
  const [interestStatus, setInterestStatus] = useState("interestBottom");
  const [commissionStatus, setCommissionStatus] = useState("commissionYes");
  const [commissionValue, setCommissionValue] = useState(0);

  const creditDuration = dateValue * 1;

  // m - Ilość kapitalizacji w roku
  const m = () => {
    if (creditDuration % 12 === 0) {
      if (creditDuration / 12 === 1) {
        return creditDuration;
      } else {
        const x = creditDuration / 12;
        const l = creditDuration / x;
        return l;
      }
    } else {
      if (creditDuration / 12 >= 1) {
        // reszta miesięcy
        const x = creditDuration % 12;
        // ilość lat
        const l = creditDuration - x;
        const n = l / 12;
        // ilość miesięcy w roku
        const y = (creditDuration - x) / n;

        // ilość lat
        return `mamy ${y} miesięcy przez ${n} lat oraz ${x} miesięcy na ostatni rok`;
      } else {
        return creditDuration % 12;
      }
    }
  };

  // Nominalna Roczna Stopa Procentowa
  const nrsp = rrsoValue;
  // Oprocentowanie w okresie bazowym
  const i = nrsp / m();
  // Rata Kapitałowa
  const rk = (creditValue / creditDuration).toFixed(2) * 1;

  //Saldo Początkowe Długu
  const [spd, setSpd] = useState(creditValue);

  //Odsetki
  const [ods, setOds] = useState(spd * (i / 100));
  // let ods = spd * (i / 100);

  // Rata Płatności Kredytu
  const [rpk, setRpk] = useState(rk + ods);

  // Saldo Końcowe Długu
  const [skd, setSkd] = useState(spd - rk);

  // flaga do wyświetlenia tabeli
  const [isActive, setIsActive] = useState(false);

  // tablice
  const arrSpdRef = useRef([]);
  const arrOdsRef = useRef([]);
  const arrRkRef = useRef([]);
  const arrRpkRef = useRef([]);
  const arrSkdRef = useRef([]);

  // Wyrysuje tabele dla kredytu spłacanego metodą równych rat kapitałowych

  const creditAmortizationEqualCapitalInstallments = () => {
    setIsActive((prev) => !prev);
    for (let n = 0; n < creditDuration; n++) {
      console.log({ n });
      // ---------------------------------
      // ---------------------------------
      setSpd((prev) => {
        const newSpd = prev - rk;
        arrSpdRef.current = [...arrSpdRef.current, newSpd];
        return newSpd;
      });
      // ---------------------------------
      // ---------------------------------
      setOds((prev) => {
        const newOds = spd * (i / 100);
        arrOdsRef.current = [...arrOdsRef.current, newOds];
        return newOds;
      });

      // ---------------------------------
      // ---------------------------------
      arrRkRef.current = [...arrRkRef.current, rk];
      // ---------------------------------
      // ---------------------------------
      // setRpk(rk + ods);
      setRpk((prev) => {
        const newRpk = rk + ods;
        arrRpkRef.current = [...arrRpkRef.current, newRpk];
        return newRpk;
      });
      // ---------------------------------
      // ---------------------------------
      setSkd((prev) => {
        const newSkd = spd - rk;
        arrRpkRef.current = [...arrRpkRef.current, newSkd];
        return newSkd;
      });
      arrSkdRef.current = [...arrSkdRef.current, skd];
    }
    console.log(arrSpdRef);
    console.log(arrOdsRef);
    console.log(arrRkRef);
    console.log(arrRpkRef);
    console.log(arrSkdRef);
  };

  // const creditAmortizationEqualCapitalInstallments = () => {
  //   for (let n = 0; n < creditDuration; n++) {
  //     // ---------------------------------
  //     // ---------------------------------
  //     setSpd((prev) => prev - rk);
  //     arrSpd = [...arrSpd, spd];
  //     // ---------------------------------
  //     // ---------------------------------
  //     setOds((prev) => (prev = spd * (i / 100)));
  //     arrOds = [...arrOds, ods];
  //     // ---------------------------------
  //     // ---------------------------------
  //     arrRk = [...arrRk, rk];
  //     // ---------------------------------
  //     // ---------------------------------
  //     setRpk(rk + ods);
  //     arrRpk = [...arrRpk, rpk];
  //     // ---------------------------------
  //     // ---------------------------------
  //     setSkd(spd - rk);
  //     arrSkd = [...arrSkd, skd];
  //   }
  //     arrSkdRef.current = [...arrSkdRef.current, skd];
  //   }
  //   console.log(arrSpdRef);
  //   console.log(arrOdsRef);
  //   console.log(arrRkRef);
  //   console.log(arrRpkRef);
  //   console.log(arrSkdRef);
  // };

  return (
    <div>
      <CreditForm
        setCreditValue={setCreditValue}
        setDateValue={setDateValue}
        setRrsoValue={setRrsoValue}
        setInterestStatus={setInterestStatus}
        setCommissionStatus={setCommissionStatus}
        setCommissionValue={setCommissionValue}
        creditAmortizationEqualCapitalInstallments={
          creditAmortizationEqualCapitalInstallments
        }
        creditValue={creditValue}
        dateValue={dateValue}
        rrsoValue={rrsoValue}
        interestStatus={interestStatus}
        commissionStatus={commissionStatus}
        commissionValue={commissionValue}
        isActive={isActive}
      />

      <CreditTable
        arrSpdRef={arrSpdRef}
        arrOdsRef={arrOdsRef}
        arrRkRef={arrRkRef}
        arrRpkRef={arrRpkRef}
        arrSkdRef={arrSkdRef}
        isActive={isActive}
      />
    </div>
  );
};

export default CreditCalc;
