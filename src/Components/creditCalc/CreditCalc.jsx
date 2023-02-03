import "../../Styles/CreditCalc.sass";
import React, { useState, useRef, useEffect } from "react";
import CreditTable from "./CreditTable";
import CreditForm from "./CreditForm";

const CreditCalc = () => {
  // Wartość kredytu
  const [creditValue, setCreditValue] = useState(1000);
  // Czas trwania kredytu
  const [dateValue, setDateValue] = useState(4);
  // Wartość oprocentowania wg banku
  const [rrsoValue, setRrsoValue] = useState(24);
  // Odsetki płatne z góry / dołu
  const [interestStatus, setInterestStatus] = useState("interestBottom");
  // Status Prowizji
  const [commissionStatus, setCommissionStatus] = useState("commissionNo");
  // Wartość Prowizji
  const [commissionValue, setCommissionValue] = useState(0);
  const [paymentInstallments, setPaymentInstallments] = useState("elpi");
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
        return 12;
      } else {
        return creditDuration % 12;
      }
    }
  };

  // Nominalna Roczna Stopa Procentowa
  const nrsp = rrsoValue;

  // Oprocentowanie w okresie bazowym
  const i = nrsp / m() / 100;

  // Prowizja
  let commission = creditValue * (commissionValue / 100);

  //Saldo Początkowe Długu
  let spd;

  // Rata Kapitałowa
  let rk;

  //Odsetki
  let ods;

  // Rata Płatności Kredytu
  let rpk;

  // Saldo Końcowe Długu
  let skd;

  // tablice dla metody płatności równych rat kapitałowych
  const arrSpdRef = useRef([spd]);
  const arrOdsRef = useRef([ods]);
  const arrRkRef = useRef([rk]);
  const arrRpkRef = useRef([rpk]);
  const arrSkdRef = useRef([skd]);
  const arraysRk = [arrSpdRef, arrOdsRef, arrRkRef, arrRpkRef, arrSkdRef];

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
    rk = parseInt((creditValue / creditDuration).toFixed(2));
    spd = parseInt(creditValue);
    ods = spd * i;
    rpk = rk + ods;
    skd = spd - rk;

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
      ods = spd * i;
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

    arraysRk.forEach((arr) => {
      arr.current.splice(-1);
    });
    setIsActive((prev) => !prev);
  };

  // Wyrysuje tabele dla Odsetek płatnych z góry
  const creditAmortizationEqualInterestBottom = () => {
    ods = creditValue * i * m();
    spd = creditValue - ods;
    rk = spd / creditDuration;
    rpk = rk;
    skd = spd - rk;
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
    arraysRk.forEach((arr) => {
      arr.current.splice(-1);
    });
    setIsActive((prev) => !prev);
  };

  // Wyrysuje tabele dla kredytu spłacanego metodą równych rat płatności kredytu
  const creditAmortizationEqualInstallmentsOfLoanPayments = () => {
    const mwbr = (1 - 1 / Math.pow(1 + i, creditDuration)) / i;
    console.log(mwbr);
    spd = parseInt(creditValue);
    ods = spd * i; // 2
    rpk = spd / mwbr; // 1 *
    rk = rpk - ods; // 3
    skd = spd - rk; // 4

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
      ods = spd * i;
      arrOdsRef.current = [...arrOdsRef.current, ods];
      // ---------------------------------
      // ---------------------------------
      rk = rpk - ods;
      arrRkRef.current = [...arrRkRef.current, rk];
      // ---------------------------------
      // ---------------------------------
      arrRpkRef.current = [...arrRpkRef.current, rpk];
      // ---------------------------------
      // ---------------------------------
      skd = spd - rk;
      arrSkdRef.current = [...arrSkdRef.current, skd];
    }
    arraysRk.forEach((arr) => {
      arr.current.splice(-1);
    });
    setIsActive((prev) => !prev);
  };

  const handlecreditAmortizationSelectMethod = () => {
    if (interestStatus === "interestBottom") {
      if (paymentInstallments === "elpi") {
        creditAmortizationEqualInstallmentsOfLoanPayments();
      } else {
        creditAmortizationEqualCapitalInstallments();
      }
    } else {
      creditAmortizationEqualInterestBottom();
    }
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
        handlecreditAmortizationSelectMethod={
          handlecreditAmortizationSelectMethod
        }
        setPaymentInstallments={setPaymentInstallments}
        creditValue={creditValue}
        dateValue={dateValue}
        rrsoValue={rrsoValue}
        interestStatus={interestStatus}
        commissionStatus={commissionStatus}
        commissionValue={commissionValue}
        paymentInstallments={paymentInstallments}
        isActive={isActive}
      />

      <CreditTable
        arraysRk={arraysRk}
        arrRkRef={arrRkRef}
        isActive={isActive}
        i={i}
        dateValue={dateValue}
        commission={commission}
        creditValue={creditValue}
      />
    </div>
  );
};

export default CreditCalc;