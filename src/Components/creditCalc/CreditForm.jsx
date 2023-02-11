import "../../Styles/./toMany/Form.sass";

const CreditForm = ({
  setCreditValue,
  setDateValue,
  setRrsoValue,
  setInterestStatus,
  setCommissionStatus,
  setCommissionValue,
  creditValue,
  dateValue,
  rrsoValue,
  interestStatus,
  commissionStatus,
  commissionValue,
  handleSelectedAmortizationMethod,
  paymentInstallments,
  setPaymentInstallments,
  isActive,
}) => {
  const handleChange = (setter) => (e) => setter(e.target.value);

  const handleSetCreditValue = handleChange(setCreditValue);
  const handleSetDateValue = handleChange(setDateValue);
  const handleSetRrsoValue = handleChange(setRrsoValue);
  const handleSelectInterestStatus = handleChange(setInterestStatus);
  const handleSelectCommissionStatus = handleChange(setCommissionStatus);
  const handleSetCommissionValue = handleChange(setCommissionValue);
  const handlePaymentInstallments = handleChange(setPaymentInstallments);
  const handleSubmitForm = (e) => {
    e.preventDefault();
  };

  return (
    <form className="form" onSubmit={handleSubmitForm}>
      <label className="form__label" htmlFor="credit">
        Jakiej wysokości chciałbyś kredyt?
        <input
          className="form__input"
          onChange={handleSetCreditValue}
          value={creditValue}
          type="number"
          min="0"
          id="credit"
        />
      </label>

      <label className="form__label" htmlFor="date">
        Na ile miesięcy chcesz kredyt?
        <input
          className="form__input"
          onChange={handleSetDateValue}
          value={dateValue}
          type="number"
          id="date"
          min="0"
        />
      </label>

      <label className="form__label" htmlFor="rrso">
        Podaj NRSP kredytu
        <input
          className="form__input"
          onChange={handleSetRrsoValue}
          value={rrsoValue}
          type="number"
          min="0"
          id="rrso"
        />
        %
      </label>

      <label className="form__label" htmlFor="interest">
        Bank pobiera odsetki płatne z
        <select
          className="form__select"
          onChange={handleSelectInterestStatus}
          value={interestStatus}
          id="interest"
        >
          <option className="select__option" value="interestTop">
            Góry
          </option>
          <option className="select__option" value="interestBottom">
            Dołu
          </option>
        </select>
      </label>

      <label className="form__label" htmlFor="commission">
        Czy bank pobiera prowizje?
        <select
          className="form__select"
          onChange={handleSelectCommissionStatus}
          value={commissionStatus}
          id="commission"
        >
          <option className="select__option" value="commissionYes">
            Tak
          </option>
          <option className="select__option" value="commissionNo">
            Nie
          </option>
        </select>
        {commissionStatus === "commissionYes" ? (
          <>
            ile wynosi?
            <input
              className="form__input"
              onChange={handleSetCommissionValue}
              value={commissionValue}
              type="number"
              min="0"
            />
            %
          </>
        ) : null}
      </label>

      <label className="form__label" htmlFor="paymentInstallments">
        Biore kredyt spłacany metodą
        <select
          className="form__select"
          onChange={handlePaymentInstallments}
          value={paymentInstallments}
          id="paymentInstallments"
        >
          {/* Equal capital installments */}
          <option className="select__option" value="eci">
            Równych Rat Kapitałowych
          </option>
          {/* Equal loan payment installments */}
          <option className="select__option" value="elpi">
            Równych Rat Płatności Kredytu
          </option>
        </select>
      </label>

      <button
        className="form__button"
        onClick={handleSelectedAmortizationMethod}
      >
        {isActive
          ? "Ukryj Tabele Amortyzacji Kredytu"
          : "Pokaż Tabele Amortyzacji Kredytu"}
      </button>
    </form>
  );
};

export default CreditForm;
