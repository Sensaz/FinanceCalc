import { useState } from "react";
const CompanyValutionCalc = () => {
  const [businessValue, setBusinessValue] = useState("");
  const [lastYearProfit, setLastYearProfit] = useState("");
  const [stockActionValue, setStockActionValue] = useState("");
  const [totalStockAction, setTotalStockAction] = useState("");
  const [bookActionValue, setBookActionValue] = useState("");

  const handleBusinessValue = (e) => {
    setBusinessValue(e.target.value);
  };
  const handleLastYearProfit = (e) => {
    setLastYearProfit(e.target.value);
  };
  const handleStockActionValue = (e) => {
    setStockActionValue(e.target.value);
  };
  const handleTotalStockAction = (e) => {
    setTotalStockAction(e.target.value);
  };
  const handleBookActionValue = (e) => {
    setBookActionValue(e.target.value);
  };

  // P/E - cena/zysk = businessValue / lastYearProfit
  // P/E < 5 - Świetna okazja
  // 5 < P/E < 8 - Tanie akcje
  // 8 < P/E < 16 - Neutralnie wycenione akcje
  // 16 < P/E < 20 - Drogie akcje
  // P/E > 20 Bańka spekulacyjna

  // P/E shillera - powalony współczynnik do wyrenderowania

  // P/S - cena/sprzedaż = Cena akcji / (Przychody spółki / Liczba akcji)
  // P/S - stockActionValue / (lastYearProfit / totalStockAction)

  // P/BV - cena/wartość księgowa = stockActionValue/bookActionValue

  return (
    <>
      <form>
        <label>
          Wartość firmy:
          <input
            type="number"
            value={businessValue}
            onChange={handleBusinessValue}
          />
        </label>
        <label>
          Zysk z 12 miesięcy:
          <input
            type="number"
            value={lastYearProfit}
            onChange={handleLastYearProfit}
          />
        </label>
        <label>
          Giełdowa cena akcji danej spółki:
          <input
            type="number"
            value={stockActionValue}
            onChange={handleStockActionValue}
          />
        </label>
        <label>
          Łączna ilość akcji danej spółki:
          <input
            type="number"
            value={totalStockAction}
            onChange={handleTotalStockAction}
          />
        </label>
        <label>
          Księgowa cena akcji danej spółki:
          <input
            type="number"
            value={bookActionValue}
            onChange={handleBookActionValue}
          />
        </label>
        <button>Oblicz</button>
      </form>
    </>
  );
};

export default CompanyValutionCalc;
