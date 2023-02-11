import { useState } from "react";
import "../../Styles/compoundInterestCalc/CompoundInterestCalc"
import CompoundInterestForm from "./CompoundInterestForm";
import CompoundInterestResul from "./CompoundInterestResul";
// Kalkulator Procentu Składanego
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
  // Rezultat z inwestycji
  const [result, setResult] = useState(null);
  // Zysk z odsetek
  const [interestValue, setInterestValue] = useState(null);
  // Dodatkowe wpłaty przed naliczeniem %
  const [additionalContributions, setAdditionalContributions] = useState(null);
  // Dodatkowe wpłaty po naliczeniu %
  const [interestAdditionalContributions, setInterestAdditionalContributions] =
    useState(0);

  const [flag, setFlag] = useState(false);

  const calcExtraPay = () => {
    if (parseInt(extraPay) === 0) return;
    const periods =
      periodType === "periodMonth" ? parseInt(period) : period * 12;

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
    return extraPay * (periods / payTypeRatio);
  };

  // m - ilość kapitalizacji w roku
  const calculateCapitalizationPerYear = () => {
    switch (capitalization) {
      case "interestDay":
        return 365;
      case "interestMonth":
        return 12;
      case "interestQuarter":
        return 4;
      case "interestSixMonth":
        return 2;
      case "interestYear":
        return 1;
      default:
        return 12;
    }
  };

  // n = łączna ilość kapitalizacji
  const calculateTotalCapitalizations = () => {
    switch (periodType) {
      case "periodYear":
        return calculateCapitalizationPerYear() * period;
      case "periodMonth":
        return (period / 12) * calculateCapitalizationPerYear();
      default:
        return calculateCapitalizationPerYear() * period;
    }
  };

  const calculate = (e) => {
    e.preventDefault();
    // PV (Present Value) = basicValue (pieniądze które mamy teraz)
    const pv = parseInt(basicValue);
    // (nominalna roczna stopa procentowa)
    const nominalAnnualInterestRate = interest;
    // i = nominalAnnualInterestRate / calculateCapitalizationPerYear
    const basePeriodInterest =
      nominalAnnualInterestRate / calculateCapitalizationPerYear() / 100;
    // pieniądze które będziemy mieli kiedyś = pieniądze które mamy teraz * (1 + oprocentowanie w okresie bazowym) do potęgi łącznej ilośći kapitalizacji inwestycji
    // FutureValue
    const fv =
      pv * Math.pow(1 + basePeriodInterest, calculateTotalCapitalizations());

    calcExtraPay();

    const interestFinalyExtraPay =
      calcExtraPay() *
      Math.pow(1 + basePeriodInterest, calculateTotalCapitalizations());

    // Rezultatem twojej inwestycji będzie kwota
    const investitionResult = (fv + interestFinalyExtraPay).toFixed(2);
    setResult(investitionResult);

    // Zysk z odsetek wyniesie
    const investitionIV = (fv - pv).toFixed(2);
    setInterestValue(investitionIV);

    // Dodatkowo wpłacisz
    const investitionAC = calcExtraPay().toFixed(2);
    setAdditionalContributions(investitionAC);

    // Odsetki z dodatkowych wpłat wyniosą
    const investitionIAC = (interestFinalyExtraPay - calcExtraPay()).toFixed(2);
    setInterestAdditionalContributions(investitionIAC);

    setFlag(true);
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
