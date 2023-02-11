import { useState } from "react";
import FScoreSurvey from "./fScore/FScoreSurvey";
import "../../../Styles/toMany/Form.sass";

const CompanyValutionForm = ({
  setPe,
  setPs,
  setPbv,
  setDividendYield,
  setDividendPayoutRatio,
  setRoe,
  setFlag,
  checkedOptions,
  setCheckedOptions,
}) => {
  const MIN = 0;
  // Wartość firmy
  const [businessValue, setBusinessValue] = useState(1000000);
  // Zysk z 12 miesięcy
  const [lastYearProfit, setLastYearProfit] = useState(200000);
  // Przychód z 12 miesięcy
  const [lastYearIncome, setLastYearIncome] = useState(400000);
  // Giełdowa cena akcji danej spółki
  const [stockActionValue, setStockActionValue] = useState(5);
  // Łączna ilość akcji danej spółki
  const [totalStockAction, setTotalStockAction] = useState(100000);
  // Nominalna wartość dywidendy przypadająca na 1 akcje
  const [nominalDividendValuePerShare, setNominalDividendValuePerShare] =
    useState(1);
  // Wartość wszystkich aktywów danej spółki
  const [assets, setAssets] = useState(800000);
  // Wartość wszystkich zobowiązań danej społki
  const [liabilities, setLiabilities] = useState(100000);

  const handleBusinessValue = (e) => {
    setBusinessValue(e.target.value);
  };
  const handleLastYearProfit = (e) => {
    setLastYearProfit(e.target.value);
  };
  const handleLastYearIncome = (e) => {
    setLastYearIncome(e.target.value);
  };
  const handleStockActionValue = (e) => {
    setStockActionValue(e.target.value);
  };
  const handleTotalStockAction = (e) => {
    setTotalStockAction(e.target.value);
  };
  const handleNominalDividendValuePerShareChange = (event) => {
    setNominalDividendValuePerShare(event.target.value);
  };
  const handleAssetsChange = (e) => {
    setAssets(e.target.value);
  };
  const handleLiabilitiesChange = (e) => {
    setLiabilities(e.target.value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    // Price/Earnings - Cena/Zysk
    const PE = businessValue / lastYearProfit;
    // Price/Sales - Cena/Sprzedaż
    const PS = stockActionValue / (lastYearIncome / totalStockAction);
    // Price/Book - Cena/Wartość Księgowa
    const PBV = (
      (stockActionValue / ((assets - liabilities) / totalStockAction)) *
      100
    ).toFixed(2);
    // Poziom Dywidendy
    const DY = (
      (nominalDividendValuePerShare / stockActionValue) *
      100
    ).toFixed(2);
    // Współczynnik Wypłat Dywidendy
    const DPR = (
      ((totalStockAction * nominalDividendValuePerShare) / lastYearProfit) *
      100
    ).toFixed(2);
    // Return On Equality - Gotówka w relacji do zadłużenia
    const ROE = ((lastYearProfit / (assets - liabilities)) * 100).toFixed(2);

    setPe(PE);
    setPs(PS);
    setPbv(PBV);
    setDividendYield(DY);
    setDividendPayoutRatio(DPR);
    setRoe(ROE);

    setFlag(true);
  };

  return (
    <form className="form" onSubmit={handleSubmitForm}>
      <label className="form__label">
        Wartość firmy:
        <input
          className="form__input"
          type="number"
          value={businessValue}
          onChange={handleBusinessValue}
          min={MIN}
          required
        />
      </label>
      <label className="form__label">
        Zysk z 12 miesięcy:
        <input
          className="form__input"
          type="number"
          value={lastYearProfit}
          onChange={handleLastYearProfit}
          min={MIN}
          required
        />
      </label>
      <label className="form__label">
        Przychód z 12 miesięcy:
        <input
          className="form__input"
          type="number"
          value={lastYearIncome}
          onChange={handleLastYearIncome}
          min={MIN}
          required
        />
      </label>
      <label className="form__label">
        Giełdowa cena akcji danej spółki:
        <input
          className="form__input"
          type="number"
          value={stockActionValue}
          onChange={handleStockActionValue}
          min={MIN}
          required
        />
      </label>
      <label className="form__label">
        Łączna ilość akcji danej spółki:
        <input
          className="form__input"
          type="number"
          value={totalStockAction}
          onChange={handleTotalStockAction}
          min={MIN}
          required
        />
      </label>
      <label className="form__label">
        Nominalna wartość dywidendy przypadająca na 1 akcje:
        <input
          className="form__input"
          type="number"
          value={nominalDividendValuePerShare}
          onChange={handleNominalDividendValuePerShareChange}
          min={MIN}
          required
        />
      </label>
      <label className="form__label">
        Wartość wszystkich aktywów danej spółki:
        <input
          className="form__input"
          type="number"
          value={assets}
          onChange={handleAssetsChange}
          min={0}
        />
      </label>
      <label className="form__label">
        Wartość wszystkich zobowiązań danej społki:
        <input
          className="form__input"
          type="number"
          value={liabilities}
          onChange={handleLiabilitiesChange}
          min={0}
        />
      </label>
      <label className="form__label">Zaznacz zdanie jeśli Spółka...:</label>
      <FScoreSurvey
        checkedOptions={checkedOptions}
        setCheckedOptions={setCheckedOptions}
      />
      <button className="form__button">Oblicz</button>
    </form>
  );
};

export default CompanyValutionForm;
