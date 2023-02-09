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
  );
};

export default CompoundInterestForm;
