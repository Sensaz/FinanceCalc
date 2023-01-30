import { useState } from "react";

const MIN = 0;

const CompoundInterestCalc = () => {
  const [basicValue, setBasicValue] = useState(0);
  const [period, setPeriod] = useState(0);
  const [periodType, setPeriodType] = useState("periodYear");
  const [interest, setInterest] = useState(0);
  const [capitalization, setCapitalization] = useState("interestMonth");
  const [extraPay, setExtraPay] = useState(0);
  const [extraPayType, setExtraPayType] = useState("monthly");

  const [result, setResult] = useState(null);

  const handleBasicValueChange = (event) => {
    setBasicValue(event.target.value);
  };

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };

  const handlePeriodTypeChange = (event) => {
    setPeriodType(event.target.value);
  };

  const handleInterestChange = (event) => {
    setInterest(event.target.value);
  };

  const handleCapitalizationChange = (event) => {
    setCapitalization(event.target.value);
  };

  const handleExtraPayChange = (event) => {
    setExtraPay(event.target.value);
  };

  const handleExtraPayTypeChange = (event) => {
    setExtraPayType(event.target.value);
  };

  const calculate = (e) => {
    e.preventDefault();
    // PV = basicValue (pieniądze które mamy teraz)
    const pv = basicValue;
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
    let fv = pv * Math.pow(1 + i, n) * 1;
    // jeśli extraPayType jest ustawione na "monthly", to dodajemy extraPay do fv co miesiąc
    if (extraPay * 1 !== 0) {
      if (extraPayType === "monthly") {
        if (periodType === "periodMonth") {
          for (let j = 0; j < period * 1; j++) {
            fv += extraPay * 1;
          }
        } else {
          for (let j = 0; j < period * 12; j++) {
            fv += extraPay * 1;
          }
        }
      } else if (extraPayType === "quarterly") {
        if (periodType === "periodMonth") {
          for (let j = 0; j < (period * 1) / 4; j++) {
            fv += extraPay * 1;
          }
        } else {
          for (let j = 0; j < (period * 12) / 4; j++) {
            fv += extraPay * 1;
          }
        }
      } else if (extraPayType === "yearly") {
        if (periodType === "periodMonth") {
          for (let j = 0; j < (period * 1) / 12; j++) {
            fv += extraPay * 1;
          }
        } else {
          for (let j = 0; j < period * 1; j++) {
            fv += extraPay * 1;
          }
        }
      }
    }

    return setResult((fv * 1).toFixed(2));
  };

  const timeResultInvesting =
    periodType === "periodYear" ? (
      <span> {period + " lat"}</span>
    ) : (
      <span>
        {(period - (period % 12)) / 12 +
          " lat i " +
          (period % 12) +
          " miesięcy"}
      </span>
    );
  return (
    <div>
      <form>
        <label htmlFor="basicValue">
          Kwota początkowa:
          <input
            type="number"
            id="basicValue"
            value={basicValue}
            onChange={handleBasicValueChange}
            min={MIN}
          />
        </label>

        <label htmlFor="period">
          Czas trwania
          <input
            type="number"
            value={period}
            onChange={handlePeriodChange}
            min={MIN}
          />
          <select value={periodType} onChange={handlePeriodTypeChange}>
            <option value="periodYear">lat</option>
            <option value="periodMonth">miesięcy</option>
          </select>
        </label>

        <label htmlFor="interest">
          Oprocentowanie(%)
          <input
            type="number"
            value={interest}
            onChange={handleInterestChange}
            min={MIN}
          />
          Kapitalizacja oprocentowania
          <select value={capitalization} onChange={handleCapitalizationChange}>
            <option value="interestDay">dzienna</option>
            <option value="interestMonth">miesięczna</option>
            <option value="interestQuarter">kwartalna</option>
            <option value="interestSixMonth">półroczna</option>
            <option value="interestYear">roczna</option>
          </select>
        </label>
        <label htmlFor="extraPay">
          Dodatkowe wpłaty
          <input
            type="number"
            value={extraPay}
            onChange={handleExtraPayChange}
            min={MIN}
          />
          <select value={extraPayType} onChange={handleExtraPayTypeChange}>
            <option value="monthly">miesięcznie</option>
            <option value="quarterly">kwartalnie</option>
            <option value="yearly">rocznie</option>
          </select>
        </label>
        <button onClick={calculate}>Oblicz</button>
      </form>
        <div id="result">
          Rezultatem twojej inwestycji będzie kwota:
          {result !== 0 ? <span>{result}</span> : null}
          <br />
          Czas trwania inwestycji wyniesie:
          {timeResultInvesting}
          <br />
          Zysk z odsetek wyniesie:
          {<span> {(result - basicValue).toFixed(2)}</span>}
        </div>
    </div>
  );
};

export default CompoundInterestCalc;
