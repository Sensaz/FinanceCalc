import "../../Styles/./creditCalc/CreditCalc.sass";
import React, { useState, useRef, useEffect } from "react";
import CreditTable from "./CreditTable";
import CreditForm from "./CreditForm";

const CreditCalc = () => {
  // Wartość kredytu
  const [creditValue, setCreditValue] = useState(1000);
  // Czas trwania kredytu
  const [dateValue, setDateValue] = useState(4);
  // Wartość oprocentowania wg ciebie
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

  const creditDuration = parseInt(dateValue);

  // Ilość kapitalizacji w roku
  const annualCapitalization = () => {
    if (creditDuration < 12) return creditDuration;
    else if (creditDuration >= 12) return 12;
  };
  // Nominalna Roczna Stopa Procentowa
  const nominalAnnualInterestRate = rrsoValue;

  // Oprocentowanie w okresie bazowym
  const basePeriodInterest =
    nominalAnnualInterestRate / annualCapitalization() / 100;

  // Prowizja
  let commissionFee = creditValue * (commissionValue / 100);

  //Saldo Początkowe Długu
  let initialDebtBalance;

  //Odsetki
  let interestPayment;

  // Rata Kapitałowa
  let capitalRepayment;

  // Rata Płatności Kredytu
  let totalLoanRepayment;

  // Saldo Końcowe Długu
  let finalDebtBalance;

  // tablice służące do renderowania tabeli
  // Tablica dla salda początkowego długu
  const initialDebtBalanceArr = useRef([initialDebtBalance]);
  // Tablica odsetek
  const interestPaymentArr = useRef([interestPayment]);
  // Tablica dla rat kapitałowych
  const capitalRepaymentArr = useRef([capitalRepayment]);
  // Tablica dla rat płatności kredytu
  const totalLoanRepaymentArr = useRef([totalLoanRepayment]);
  // Tablica dla sald końcowych długu
  const finalDebtBalanceArr = useRef([finalDebtBalance]);

  const arraysRk = [
    initialDebtBalanceArr,
    interestPaymentArr,
    capitalRepaymentArr,
    totalLoanRepaymentArr,
    finalDebtBalanceArr,
  ];

  useEffect(() => {
    return () => {
      initialDebtBalanceArr.current = [];
      interestPaymentArr.current = [];
      capitalRepaymentArr.current = [];
      totalLoanRepaymentArr.current = [];
      finalDebtBalanceArr.current = [];
    };
  }, [isActive]);

  // Wyrysuje tabele dla kredytu spłacanego metodą równych rat kapitałowych
  const calculateEqualCapitalInstallments = () => {
    capitalRepayment = parseInt((creditValue / creditDuration).toFixed(2));
    initialDebtBalance = parseInt(creditValue);
    interestPayment = initialDebtBalance * basePeriodInterest;
    totalLoanRepayment = capitalRepayment + interestPayment;
    finalDebtBalance = initialDebtBalance - capitalRepayment;

    initialDebtBalanceArr.current.push(initialDebtBalance);
    interestPaymentArr.current.push(interestPayment);
    capitalRepaymentArr.current.push(capitalRepayment);
    totalLoanRepaymentArr.current.push(totalLoanRepayment);
    finalDebtBalanceArr.current.push(finalDebtBalance);
    for (let n = 0; n < creditDuration; n++) {
      // ---------------------------------
      // ---------------------------------
      initialDebtBalance = initialDebtBalance - capitalRepayment;
      initialDebtBalanceArr.current = [
        ...initialDebtBalanceArr.current,
        initialDebtBalance,
      ];
      // ---------------------------------
      // ---------------------------------
      interestPayment = initialDebtBalance * basePeriodInterest;
      interestPaymentArr.current = [
        ...interestPaymentArr.current,
        interestPayment,
      ];
      // ---------------------------------
      // ---------------------------------
      capitalRepaymentArr.current = [
        ...capitalRepaymentArr.current,
        capitalRepayment,
      ];
      // ---------------------------------
      // ---------------------------------
      totalLoanRepayment = capitalRepayment + interestPayment;
      totalLoanRepaymentArr.current = [
        ...totalLoanRepaymentArr.current,
        totalLoanRepayment,
      ];
      // ---------------------------------
      // ---------------------------------
      finalDebtBalance = initialDebtBalance - capitalRepayment;
      finalDebtBalanceArr.current = [
        ...finalDebtBalanceArr.current,
        finalDebtBalance,
      ];
    }

    arraysRk.forEach((arr) => {
      arr.current.splice(-1);
    });
    setIsActive((prev) => !prev);
  };

  // Wyrysuje tabele dla Odsetek płatnych z góry
  const calculateEqualInterestBottom = () => {
    interestPayment = creditValue * basePeriodInterest * annualCapitalization();
    initialDebtBalance = creditValue - interestPayment;
    capitalRepayment = initialDebtBalance / creditDuration;
    totalLoanRepayment = capitalRepayment;
    finalDebtBalance = initialDebtBalance - capitalRepayment;
    initialDebtBalanceArr.current.push(initialDebtBalance);
    interestPaymentArr.current.push(0);
    capitalRepaymentArr.current.push(capitalRepayment);
    totalLoanRepaymentArr.current.push(totalLoanRepayment);
    finalDebtBalanceArr.current.push(finalDebtBalance);
    for (let n = 0; n < creditDuration; n++) {
      // ---------------------------------
      // ---------------------------------
      initialDebtBalance = initialDebtBalance - capitalRepayment;
      initialDebtBalanceArr.current = [
        ...initialDebtBalanceArr.current,
        initialDebtBalance,
      ];
      // ---------------------------------
      // ---------------------------------
      interestPaymentArr.current = [...interestPaymentArr.current, 0];
      // ---------------------------------
      // ---------------------------------
      capitalRepaymentArr.current = [
        ...capitalRepaymentArr.current,
        capitalRepayment,
      ];
      // ---------------------------------
      // ---------------------------------
      totalLoanRepayment = capitalRepayment;
      totalLoanRepaymentArr.current = [
        ...totalLoanRepaymentArr.current,
        totalLoanRepayment,
      ];
      // ---------------------------------
      // ---------------------------------
      finalDebtBalance = initialDebtBalance - capitalRepayment;
      finalDebtBalanceArr.current = [
        ...finalDebtBalanceArr.current,
        finalDebtBalance,
      ];
    }
    arraysRk.forEach((arr) => {
      arr.current.splice(-1);
    });
    setIsActive((prev) => !prev);
  };

  // Wyrysuje tabele dla kredytu spłacanego metodą równych rat płatności kredytu
  const calculateEqualInstallmentsOfLoanPayments = () => {
    const mwbr =
      (1 - 1 / Math.pow(1 + basePeriodInterest, creditDuration)) /
      basePeriodInterest;
    initialDebtBalance = parseInt(creditValue);
    interestPayment = initialDebtBalance * basePeriodInterest; // 2
    totalLoanRepayment = initialDebtBalance / mwbr; // 1 *
    capitalRepayment = totalLoanRepayment - interestPayment; // 3
    finalDebtBalance = initialDebtBalance - capitalRepayment; // 4

    initialDebtBalanceArr.current.push(initialDebtBalance);
    interestPaymentArr.current.push(interestPayment);
    capitalRepaymentArr.current.push(capitalRepayment);
    totalLoanRepaymentArr.current.push(totalLoanRepayment);
    finalDebtBalanceArr.current.push(finalDebtBalance);
    for (let n = 0; n < creditDuration; n++) {
      // ---------------------------------
      // ---------------------------------
      initialDebtBalance = initialDebtBalance - capitalRepayment;
      initialDebtBalanceArr.current = [
        ...initialDebtBalanceArr.current,
        initialDebtBalance,
      ];
      // ---------------------------------
      // ---------------------------------
      interestPayment = initialDebtBalance * basePeriodInterest;
      interestPaymentArr.current = [
        ...interestPaymentArr.current,
        interestPayment,
      ];
      // ---------------------------------
      // ---------------------------------
      capitalRepayment = totalLoanRepayment - interestPayment;
      capitalRepaymentArr.current = [
        ...capitalRepaymentArr.current,
        capitalRepayment,
      ];
      // ---------------------------------
      // ---------------------------------
      totalLoanRepaymentArr.current = [
        ...totalLoanRepaymentArr.current,
        totalLoanRepayment,
      ];
      // ---------------------------------
      // ---------------------------------
      finalDebtBalance = initialDebtBalance - capitalRepayment;
      finalDebtBalanceArr.current = [
        ...finalDebtBalanceArr.current,
        finalDebtBalance,
      ];
    }
    arraysRk.forEach((arr) => {
      arr.current.splice(-1);
    });
    setIsActive((prev) => !prev);
  };

  const handleSelectedAmortizationMethod = () => {
    if (interestStatus === "interestBottom") {
      if (paymentInstallments === "elpi") {
        calculateEqualInstallmentsOfLoanPayments();
      } else {
        calculateEqualCapitalInstallments();
      }
    } else {
      calculateEqualInterestBottom();
    }
  };

  return (
    <div className="creditCalc">
      <CreditForm
        setCreditValue={setCreditValue}
        setDateValue={setDateValue}
        setRrsoValue={setRrsoValue}
        setInterestStatus={setInterestStatus}
        setCommissionStatus={setCommissionStatus}
        setCommissionValue={setCommissionValue}
        handleSelectedAmortizationMethod={handleSelectedAmortizationMethod}
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
        capitalRepaymentArr={capitalRepaymentArr}
        isActive={isActive}
        basePeriodInterest={basePeriodInterest}
        dateValue={dateValue}
        commissionFee={commissionFee}
        creditValue={creditValue}
        rrsoValue={rrsoValue}
        interestStatus={interestStatus}
      />
    </div>
  );
};

export default CreditCalc;
