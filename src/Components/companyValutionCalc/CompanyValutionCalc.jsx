import { useState } from "react";
import "../../Styles/Form.sass";
import "../../Styles/CompanyValution.sass";
const CompanyValutionCalc = () => {
  const help = [
    {
      id: 0,
      info: `Współczynnik P/E - Price/Earnings czyli Cena/Zysk określa wartość firmy do jej dochodu generalnie im niższy tym lepiej, określa on czy akcje danej firmy są przewartościowane czy też niedowartościowane. Może on przekłamać dane w przypadku gdy wystąpi recesja lub sektor jest mocno podatny na recesje czytaj nie jest pierwszej potrzeby lub gdy wystąpi takzwany ponad planowy zysk czyli gdy firma nagle sprzeda swoje aktywa.

       P/E <= 5 - Świetna okazja
       5 < P/E <= 8 - Tanie akcje
       8 < P/E <= 16 - Neutralnie wycenione akcje
       16 < P/E <= 20 - Drogie akcje
       P/E > 20 Bańka spekulacyjna
      `,
    },
    {
      id: 1,
      info: `Współczynnik P/S -Price/Sales czyli Cena/Sprzedaż określa wartość ceny akcji do wartości jej sprzedaży, jest on wartościowy tylko gdy porównujemy ze sobą firmy z tej samej branży. Wynik oznacza że cena jednej akcji jest równa x * wartość sprzedaży na jedną akcje. Generalnie im niższy P/S tym lepiej.

       P/S > 1 oznacza to, że cena jednej akcji jest wyższa niż wartość sprzedaży na jedną akcję

       P/S < 1 znacza to, że cena jednej akcji jest niższa niż wartość sprzedaży na jedną akcję
      `,
    },
    {
      id: 2,
      info: `Współczynnik P/BV - Price/BookValue czyli Cena/WartośćKsięgowa określa wartość giełdową spółki w relacji do jej wartości księgowej gdzie wartością kesięgową jest suma wszystkich aktywów pomniejszona o zobowiązania spółki. Dzeięki temu Współczynnikowi możemy oszacować czy cena kacji firmy jest przewartościowana czy też niedowartościowana
      
      P/BV > 100% - Przewartościowane akcje
      P/BV < 100% - Niedowartościowane akcje
      `,
    },
    {
      id: 3,
      info: `Poziom Dywidendy określa jaki % wartości akcji spółka po roku daje dodatkowo jej posiadaczowi. Dobry poziom dywidendy oscyluje w granicach 8%`,
    },
    {
      id: 4,
      info: `Współczynnik Wypłat Dywidendy określa jaki % spółka przeznacza ze swoich Rocznych zysków na wypłaty dywidendy. Zdrowy poziom dla spółki oscyluje w granicach 40% a na pewno nie powinien przekraczać 100%`,
    },
    {
      id: 5,
      info: `ROE - Return On Equality czyli gotówna w relacji do zadłużenia. Wskaźnik ten pokazuje wysokość potencjału spółki do generowania zysków. Wyraża w procentach zysk netto spółki w porównaniu z jej kapitałem
      
      ROE może zostać zawyżone gdy spółka się zadłuży lub dokona jednorazowej sprzedaży majątku

      ROE < 10% - źle
      10% < ROE < 20% - neutralnie
      20% < ROE < 30% - dobrze
      ROE > 30% - bardzo dobrze
      `,
    },
    {
      id: 6,
      info: `F-Score - wskaźnik Piotroskiego, pokazuje jak sytuacja finansowa spółki poprawiła się (wynik bliżej 9) czy pogorszyła (wynik bliżej 0). Spółce przyznajemy po punkcie za każde zgadzające się zdanie. F-Score daje obraz zmiany w stosunku do poprzedniego roku, przy tym wskaźniku ważne jest upenwienie się że firma nie działa w złej branży w złym czasie`,
    },
  ];
  const fScoreOptions = [
    {
      id: 0,
      value: "Wypracowała zysk netto w trakcie ostatniego roku",
    },
    {
      id: 1,
      value:
        "Zanotowała dodatnie przepływy pieniężne z działalności operacyjnej w ostatnim roku",
    },
    {
      id: 2,
      value:
        "Poprawiła poziom rentowności aktywów w porównaniu z wcześniejszym rokiem",
    },
    {
      id: 3,
      value:
        "Wartość przepływów z działalności operacyjnej była w ostatnim roku większa od zysku netto",
    },
    {
      id: 4,
      value:
        "W ostatnim roku zmniejszył się stosunek zadłużenia długoterminowego do wartości aktywów spółki  ",
    },
    {
      id: 5,
      value:
        "Stosunek aktywów obrotowych do zadłużenia krótkoterminowego jest wyższy niż w poprzednim roku",
    },
    {
      id: 6,
      value:
        "Liczba wyeliminowanych akcji nie wzrosła w porównaniu z poprzednim rokiem",
    },
    {
      id: 7,
      value:
        "Marża na sprzedaży poprawiła się w porównaniu z poprzednim rokiem",
    },
    {
      id: 8,
      value: "Wartość wskaźnika rotacji aktywów jest wyższa niż przed rokiem",
    },
  ];

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

  // stockActionValue / (lastYearProfit / lastYearIncome)

  // Wartość wszystkich aktywów danej spółki
  const [assets, setAssets] = useState(800000);
  // Wartość wszystkich zobowiązań danej społki
  const [liabilities, setLiabilities] = useState(100000);

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

  const [flag, setFlag] = useState(false);

  const [checkedOptions, setCheckedOptions] = useState([]);

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

  const handleCheckedOption = (id, isChecked) => {
    if (isChecked) {
      setCheckedOptions([...checkedOptions, id]);
    } else {
      setCheckedOptions(checkedOptions.filter((optionId) => optionId !== id));
    }
  };

  const CheckboxOption = ({ id, value, checked, onCheckedChange }) => (
    <label>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(event) => onCheckedChange(event.target.checked)}
      />
      {value}
    </label>
  );

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
    <>
      <form onSubmit={handleSubmitForm}>
        <label>
          Wartość firmy:
          <input
            type="number"
            value={businessValue}
            onChange={handleBusinessValue}
            min={MIN}
            required
          />
        </label>
        <label>
          Zysk z 12 miesięcy:
          <input
            type="number"
            value={lastYearProfit}
            onChange={handleLastYearProfit}
            min={MIN}
            required
          />
        </label>
        <label>
          Przychód z 12 miesięcy:
          <input
            type="number"
            value={lastYearIncome}
            onChange={handleLastYearIncome}
            min={MIN}
            required
          />
        </label>
        <label>
          Giełdowa cena akcji danej spółki:
          <input
            type="number"
            value={stockActionValue}
            onChange={handleStockActionValue}
            min={MIN}
            required
          />
        </label>
        <label>
          Łączna ilość akcji danej spółki:
          <input
            type="number"
            value={totalStockAction}
            onChange={handleTotalStockAction}
            min={MIN}
            required
          />
        </label>
        <label>
          Nominalna wartość dywidendy przypadająca na 1 akcje:
          <input
            type="number"
            value={nominalDividendValuePerShare}
            onChange={handleNominalDividendValuePerShareChange}
            min={MIN}
            required
          />
        </label>
        <label>
          Wartość wszystkich aktywów danej spółki:
          <input
            type="number"
            value={assets}
            onChange={handleAssetsChange}
            min={0}
          />
        </label>
        <label>
          Wartość wszystkich zobowiązań danej społki:
          <input
            type="number"
            value={liabilities}
            onChange={handleLiabilitiesChange}
            min={0}
          />
        </label>
        <label>Zaznacz zdanie jeśli Spółka...:</label>
        {fScoreOptions.map((option) => (
          <CheckboxOption
            key={option.id}
            {...option}
            checked={checkedOptions.includes(option.id)}
            onCheckedChange={(isChecked) =>
              handleCheckedOption(option.id, isChecked)
            }
          />
        ))}
        <button>Oblicz</button>
      </form>
      <p>
        {flag ? `P/E Wynosi: ${pe}` : null}
        {flag && <span title={help[0].info}>[?]</span>}
      </p>
      <p>
        {flag ? `P/S Wynosi: ${ps}` : null}
        {flag && <span title={help[1].info}>[?]</span>}
      </p>
      <p>
        {flag ? `P/BV Wynosi: ${pbv} %` : null}
        {flag && <span title={help[2].info}>[?]</span>}
      </p>
      <p>
        {flag ? `Poziom Dywidendy Wynosi: ${dividendYield} %` : null}
        {flag && <span title={help[3].info}>[?]</span>}
      </p>
      <p>
        {flag
          ? `Współczynnik Wypłat Dywidendy Wynosi: ${dividendPayoutRatio} %`
          : null}
        {flag && <span title={help[4].info}>[?]</span>}
      </p>
      <p>
        {flag ? `ROE wynosi: ${roe} %` : null}
        {flag && <span title={help[5].info}>[?]</span>}
      </p>
      <p>
        {flag ? `F-Score wynosi: ${checkedOptions.length}` : null}
        {flag && <span title={help[6].info}>[?]</span>}
      </p>
    </>
  );
};

export default CompanyValutionCalc;
