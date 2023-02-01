import "../../Styles/CreditCalc.sass";
import React, { useState, useRef, useEffect } from "react";
import CreditTable from "./CreditTable";
import CreditForm from "./CreditForm";

const CreditCalc = () => {
  // Wartość kredytu
  const [creditValue, setCreditValue] = useState(10000);
  // Czas trwania kredytu
  const [dateValue, setDateValue] = useState(10);
  // Wartość oprocentowania wg banku
  const [rrsoValue, setRrsoValue] = useState(10);
  // Odsetki płatne z góry / dołu
  const [interestStatus, setInterestStatus] = useState("interestBottom");
  // Status Prowizji
  const [commissionStatus, setCommissionStatus] = useState("commissionYes");
  // Wartość Prowizji
  const [commissionValue, setCommissionValue] = useState(0);
  // flaga do wyświetlenia tabeli
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    return () => {
      setCommissionValue(0);
    };
  }, [commissionStatus]);

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

  // Prowizja
  let commission = creditValue * (commissionValue / 100);
  // Rata Kapitałowa

  let rk = parseInt(((creditValue - commission) / creditDuration).toFixed(2));

  //Saldo Początkowe Długu
  let spd = parseInt(creditValue - commission);

  //Odsetki
  let ods = spd * (i / 100);

  // Rata Płatności Kredytu
  let rpk = rk + ods;
  // Saldo Końcowe Długu
  let skd = spd - rk;

  // tablice
  const arrSpdRef = useRef([spd]);
  const arrOdsRef = useRef([ods]);
  const arrRkRef = useRef([rk]);
  const arrRpkRef = useRef([rpk]);
  const arrSkdRef = useRef([skd]);
  const arrays = [arrSpdRef, arrOdsRef, arrRkRef, arrRpkRef, arrSkdRef];

  useEffect(() => {
    return () => {
      arrSpdRef.current = [];
      arrOdsRef.current = [];
      arrRkRef.current = [];
      arrRpkRef.current = [];
      arrSkdRef.current = [];
    };
  }, [isActive]);

  // Wyrysuje tabele dla kredytu spłacanego metodą równych rat kapitałowych

  const creditAmortizationEqualCapitalInstallments = () => {
    if (interestStatus === "interestTop") {
      ods = spd * (i / 100) * m();
      spd = spd - ods;
      rk = spd / creditDuration;
      rpk = rk;
      skd = spd - rk;

      arrays.forEach((arr) => {
        arr.current.splice(-1);
      });
      arrSpdRef.current.push(spd);
      arrOdsRef.current.push(0);
      arrRkRef.current.push(rk);
      arrRpkRef.current.push(rpk);
      arrSkdRef.current.push(skd);

      for (let n = 0; n < creditDuration; n++) {
        // ---------------------------------
        // ---------------------------------
        spd = spd - rk;
        arrSpdRef.current = [...arrSpdRef.current, spd];
        // ---------------------------------
        // ---------------------------------
        arrOdsRef.current = [...arrOdsRef.current, 0];
        // ---------------------------------
        // ---------------------------------
        arrRkRef.current = [...arrRkRef.current, rk];
        // ---------------------------------
        // ---------------------------------
        rpk = rk;
        arrRpkRef.current = [...arrRpkRef.current, rpk];
        // ---------------------------------
        // ---------------------------------
        skd = spd - rk;
        arrSkdRef.current = [...arrSkdRef.current, skd];
      }
    } else {
      arrSpdRef.current.push(spd);
      arrOdsRef.current.push(ods);
      arrRkRef.current.push(rk);
      arrRpkRef.current.push(rpk);
      arrSkdRef.current.push(skd);
      for (let n = 0; n < creditDuration; n++) {
        // ---------------------------------
        // ---------------------------------
        spd = spd - rk;
        arrSpdRef.current = [...arrSpdRef.current, spd];
        // ---------------------------------
        // ---------------------------------
        ods = spd * (i / 100);
        arrOdsRef.current = [...arrOdsRef.current, ods];
        // ---------------------------------
        // ---------------------------------
        arrRkRef.current = [...arrRkRef.current, rk];
        // ---------------------------------
        // ---------------------------------
        rpk = rk + ods;
        arrRpkRef.current = [...arrRpkRef.current, rpk];
        // ---------------------------------
        // ---------------------------------
        skd = spd - rk;
        arrSkdRef.current = [...arrSkdRef.current, skd];
      }
    }

    arrays.forEach((arr) => {
      arr.current.splice(-1);
    });
    setIsActive((prev) => !prev);
  };
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

      <CreditTable arrays={arrays} arrRkRef={arrRkRef} isActive={isActive} />
    </div>
  );
};

export default CreditCalc;
