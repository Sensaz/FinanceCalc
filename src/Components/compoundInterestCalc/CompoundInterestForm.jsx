import "../../Styles/toMany/Form.sass";

const CompoundInterestForm = ({
  setBasicValue,
  setPeriod,
  setPeriodType,
  setInterest,
  setCapitalization,
  setExtraPay,
  setExtraPayType,
  basicValue,
  period,
  periodType,
  interest,
  capitalization,
  extraPay,
  extraPayType,
  calculate,
}) => {
  const MIN = 0;

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

  return (
    <form className="form">
      <label className="form__label" htmlFor="basicValue">
        Kwota początkowa:
        <input
          className="form__input"
          type="number"
          id="basicValue"
          value={basicValue}
          onChange={handleBasicValueChange}
          min={MIN}
        />
      </label>

      <label className="form__label" htmlFor="period">
        Czas trwania
        <input
          className="form__input"
          type="number"
          value={period}
          onChange={handlePeriodChange}
          min={MIN}
        />
        <select
          className="form__select"
          value={periodType}
          onChange={handlePeriodTypeChange}
        >
          <option className="select__option" value="periodYear">
            lat
          </option>
          <option className="select__option" value="periodMonth">
            miesięcy
          </option>
        </select>
      </label>

      <label className="form__label" htmlFor="interest">
        Oprocentowanie(%)
        <input
          className="form__input"
          type="number"
          value={interest}
          onChange={handleInterestChange}
          min={MIN}
        />
        Kapitalizacja oprocentowania
        <select
          className="form__select"
          value={capitalization}
          onChange={handleCapitalizationChange}
        >
          <option className="select__option" value="interestDay">
            dzienna
          </option>
          <option className="select__option" value="interestMonth">
            miesięczna
          </option>
          <option className="select__option" value="interestQuarter">
            kwartalna
          </option>
          <option className="select__option" value="interestSixMonth">
            półroczna
          </option>
          <option className="select__option" value="interestYear">
            roczna
          </option>
        </select>
      </label>
      <label className="form__label" htmlFor="extraPay">
        Dodatkowe wpłaty
        <input
          className="form__input"
          type="number"
          value={extraPay}
          onChange={handleExtraPayChange}
          min={MIN}
        />
        <select
          className="form__select"
          value={extraPayType}
          onChange={handleExtraPayTypeChange}
        >
          <option className="select__option" value="monthly">
            miesięcznie
          </option>
          <option className="select__option" value="quarterly">
            kwartalnie
          </option>
          <option className="select__option" value="yearly">
            rocznie
          </option>
        </select>
      </label>
      <button className="form__button" onClick={calculate}>
        Oblicz
      </button>
    </form>
  );
};

export default CompoundInterestForm;
