import "../../Styles/Form.sass";

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
  handlecreditAmortizationSelectMethod,
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
    <form onSubmit={handleSubmitForm}>
      <label htmlFor="credit">
        Jakiej wysokości chciałbyś kredyt?
        <input
          onChange={handleSetCreditValue}
          value={creditValue}
          type="number"
          min="0"
          id="credit"
        />
      </label>

      <label htmlFor="date">
        Na ile miesięcy chcesz kredyt?
        <input
          onChange={handleSetDateValue}
          value={dateValue}
          type="number"
          id="date"
          min="0"
        />
      </label>

      <label htmlFor="rrso">
        Podaj NRSP kredytu
        <input
          onChange={handleSetRrsoValue}
          value={rrsoValue}
          type="number"
          min="0"
          id="rrso"
        />
        %
      </label>

      <label htmlFor="interest">
        Bank pobiera odsetki płatne z
        <select
          onChange={handleSelectInterestStatus}
          value={interestStatus}
          id="interest"
        >
          <option value="interestTop">Góry</option>
          <option value="interestBottom">Dołu</option>
        </select>
      </label>

      <label htmlFor="commission">
        Czy bank pobiera prowizje?
        <select
          onChange={handleSelectCommissionStatus}
          value={commissionStatus}
          id="commission"
        >
          <option value="commissionYes">Tak</option>
          <option value="commissionNo">Nie</option>
        </select>
        {commissionStatus === "commissionYes" ? (
          <>
            ile wynosi?
            <input
              onChange={handleSetCommissionValue}
              value={commissionValue}
              type="number"
              min="0"
            />
            %
          </>
        ) : null}
      </label>

      <label htmlFor="paymentInstallments">
        Biore kredyt spłacany metodą
        <select
          onChange={handlePaymentInstallments}
          value={paymentInstallments}
          id="paymentInstallments"
        >
          {/* Equal capital installments */}
          <option value="eci">Równych Rat Kapitałowych</option>
          {/* Equal loan payment installments */}
          <option value="elpi">Równych Rat Płatności Kredytu</option>
        </select>
      </label>

      <button onClick={handlecreditAmortizationSelectMethod}>
        {isActive
          ? "Ukryj Tabele Amortyzacji Kredytu"
          : "Pokaż Tabele Amortyzacji Kredytu"}
      </button>
    </form>
  );
};

export default CreditForm;
