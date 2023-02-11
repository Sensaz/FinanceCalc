import { useState } from "react";
import "../../Styles/./toMany/Form.sass";

import CompanyValutionForm from "./form/CompanyValutionForm";
import CompnayValutionResult from "./CompnayValutionResult";

const CompanyValutionCalc = () => {
  // Price/Earnings - Cena/Zysk
  const [pe, setPe] = useState();
  // Price/Sales - Cena/Sprzedaż
  const [ps, setPs] = useState();
  // Price/Book - Cena/Wartość Księgowa
  const [pbv, setPbv] = useState();
  // Poziom Dywidendy
  const [dividendYield, setDividendYield] = useState();
  // Współczynnik Wypłat Dywidendy
  const [dividendPayoutRatio, setDividendPayoutRatio] = useState();
  // Return On Equality - Gotówka w relacji do zadłużenia
  const [roe, setRoe] = useState();

  // na bank
  const [flag, setFlag] = useState(false);

  const [checkedOptions, setCheckedOptions] = useState([]);

  return (
    <>
      <CompanyValutionForm
        setPe={setPe}
        setPs={setPs}
        setPbv={setPbv}
        setDividendYield={setDividendYield}
        setDividendPayoutRatio={setDividendPayoutRatio}
        setRoe={setRoe}
        setFlag={setFlag}
        checkedOptions={checkedOptions}
        setCheckedOptions={setCheckedOptions}
      />
      {flag && (
        <CompnayValutionResult
          pe={pe}
          ps={ps}
          pbv={pbv}
          dividendYield={dividendYield}
          dividendPayoutRatio={dividendPayoutRatio}
          roe={roe}
          flag={flag}
          checkedOptions={checkedOptions}
        />
      )}
    </>
  );
};

export default CompanyValutionCalc;