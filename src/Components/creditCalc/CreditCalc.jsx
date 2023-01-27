const CreditCalc = () => {
  return (
    <div>
      <form>
        <label htmlFor="credit">
          Ile chciałbyś otrzymać od banku?
          <input type="number" id="credit" /> zł
        </label>

        <label htmlFor="date">
          Do kiedy chcesz spłacać kredyt?
          <input type="date" id="date" />
        </label>
aa
        <label htmlFor="rrso">
          Podaj RRSO banku
          <input type="text" id="rrso" /> %
        </label>

        <label htmlFor="commission">
          Czy bank pobiera prowizje?
          <select id="commission">
            <option value="yes-top">Tak i jest płatna z góry</option>
            <option value="yes-bottom">Tak i jest płatna z dołu</option>
            <option value="no">Nie</option>
          </select>
          ile wynosi?
          <input type="number" />
        </label>
      </form>
    </div>
  );
};

export default CreditCalc;
