import { useState } from "react";
import "../../Styles/Form.sass";
import "../../Styles/Interest.sass";
import CompoundInterestForm from "./CompoundInterestForm";
import CompoundInterestResul from "./CompoundInterestResul";

const CompoundInterestCalc = () => {
  // Kwota Początkowa
  const [basicValue, setBasicValue] = useState(10000);
  // Czas Trwania
  const [period, setPeriod] = useState(1);
  // Okres w jakim czas trwania jest podany lat/miesięcy
  const [periodType, setPeriodType] = useState("periodYear");
  // Oprocentowanie
  const [interest, setInterest] = useState(10);
  // Kapitalizacja Oprocentowania
  const [capitalization, setCapitalization] = useState("interestMonth");
  // Kwota dodatkowych wpłat
  const [extraPay, setExtraPay] = useState(10);
  // Co ile dodatkowo będziemy wpłacać
  const [extraPayType, setExtraPayType] = useState("monthly");

  const [result, setResult] = useState(null);
  const [interestValue, setInterestValue] = useState(null);
  const [additionalContributions, setAdditionalContributions] = useState(null);
  const [interestAdditionalContributions, setInterestAdditionalContributions] =
    useState(0);

  const [flag, setFlag] = useState(false);

  let finalyExtraPay = 0;
  const calcExtraPay = () => {
    if (extraPay * 1 === 0) return;
    const periods = periodType === "periodMonth" ? period * 1 : period * 12;
    let payTypeRatio = 0;
    // eslint-disable-next-line default-case
    switch (extraPayType) {
      case "monthly":
        payTypeRatio = 1;
        break;
      case "quarterly":
        payTypeRatio = 4;
        break;
      case "yearly":
        payTypeRatio = 12;
        break;
    }
    finalyExtraPay = extraPay * (periods / payTypeRatio);
  };

  const calculate = (e) => {
    e.preventDefault();
    // PV = basicValue (pieniądze które mamy teraz)
    const pv = parseInt(basicValue);
    // NRSP = interest (nominalna roczna stopa procentowa)
    const nrsp = interest;
    // m = switch dla capitalization (ilość kapitalizacji w roku)
    let m;
    switch (capitalization) {
      case "interestDay":
        m = 365;
        break;
      case "interestMonth":
        m = 12;
        break;
      case "interestQuarter":
        m = 4;
        break;
      case "interestSixMonth":
        m = 2;
        break;
      case "interestYear":
        m = 1;
        break;
      default:
        m = 12;
    }
    // i = NRSP / m
    const i = nrsp / m / 100;
    // n = łączna ilość kapitalizacji
    let n;
    switch (periodType) {
      case "periodYear":
        n = m * period;
        break;
      case "periodMonth":
        n = (period / 12) * m;
        break;
      default:
        n = m * period;
    }
    // pieniądze które będziemy mieli kiedyś = pieniądze które mamy teraz * (1 + oprocentowanie w okresie bazowym)do potęgi łącznej ilość kapitalizacji inwestycji
    let fv = pv * Math.pow(1 + i, n);
    // jeśli extraPayType jest ustawione na "monthly", to dodajemy extraPay do fv co miesiąc
    let interestFinalyExtraPay = 0;

    calcExtraPay(finalyExtraPay);

    interestFinalyExtraPay = finalyExtraPay * Math.pow(1 + i, n);

    setInterestValue((fv - pv).toFixed(2));
    setAdditionalContributions(finalyExtraPay);
    setInterestAdditionalContributions(
      (interestFinalyExtraPay - finalyExtraPay).toFixed(2)
    );
    setResult((fv + interestFinalyExtraPay).toFixed(2));
    return setFlag(true);
  };

  let timeResultInvesting;
  if (periodType === "periodYear") {
    timeResultInvesting = period + " lat";
  } else {
    timeResultInvesting =
      (period - (period % 12)) / 12 + " lat i " + (period % 12) + " miesięcy";
  }

  return (
    <div>
      <CompoundInterestForm
        setBasicValue={setBasicValue}
        setPeriod={setPeriod}
        setPeriodType={setPeriodType}
        setInterest={setInterest}
        setCapitalization={setCapitalization}
        setExtraPay={setExtraPay}
        setExtraPayType={setExtraPayType}
        basicValue={basicValue}
        period={period}
        periodType={periodType}
        interest={interest}
        capitalization={capitalization}
        extraPay={extraPay}
        extraPayType={extraPayType}
        calculate={calculate}
      />
      {flag && (
        <CompoundInterestResul
          resultValue={result}
          timeResultInvesting={timeResultInvesting}
          interestValue={interestValue}
          additionalContributions={additionalContributions}
          interestAdditionalContributions={interestAdditionalContributions}
        />
      )}
    </div>
  );
};

export default CompoundInterestCalc;