import { useState } from "react";
import "../../Styles/toMany/Result.sass";
import Popup from "./Popup";

const CompanyValutionResult = ({
  ps,
  pe,
  pbv,
  dividendYield,
  dividendPayoutRatio,
  roe,
  checkedOptions,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState();

  const score = [
    {
      id: 0,
      title: "P/E Wynosi: ",
      info: "Współczynnik P/E - Price/Earnings czyli Cena/Zysk określa wartość firmy do jej dochodu generalnie im niższy tym lepiej, określa on czy akcje danej firmy są przewartościowane czy też niedowartościowane. Może on przekłamać dane w przypadku gdy wystąpi recesja lub sektor jest mocno podatny na recesje czytaj nie jest pierwszej potrzeby lub gdy wystąpi takzwany ponad planowy zysk czyli gdy firma nagle sprzeda swoje aktywa. P/E <= 5 - Świetna okazja 5 < P/E <= 8 - Tanie akcje 8 < P/E <= 16 - Neutralnie wycenione akcje 16 < P/E <= 20 - Drogie akcje P/E > 20 Bańka spekulacyjna",
      score: pe,
    },
    {
      id: 1,
      title: "P/S Wynosi: ",
      info: "Współczynnik P/S -Price/Sales czyli Cena/Sprzedaż określa wartość ceny akcji do wartości jej sprzedaży, jest on wartościowy tylko gdy porównujemy ze sobą firmy z tej samej branży. Wynik oznacza że cena jednej akcji jest równa x * wartość sprzedaży na jedną akcje. Generalnie im niższy P/S tym lepiej. P/S > 1 oznacza to, że cena jednej akcji jest wyższa niż wartość sprzedaży na jedną akcję P/S < 1 znacza to, że cena jednej akcji jest niższa niż wartość sprzedaży na jedną akcję",
      score: ps,
    },
    {
      id: 2,
      title: "P/BV Wynosi: ",
      info: "Współczynnik P/BV - Price/BookValue czyli Cena/WartośćKsięgowa określa wartość giełdową spółki w relacji do jej wartości księgowej gdzie wartością kesięgową jest suma wszystkich aktywów pomniejszona o zobowiązania spółki. Dzeięki temu Współczynnikowi możemy oszacować czy cena kacji firmy jest przewartościowana czy też niedowartościowana P/BV > 100% - Przewartościowane akcje P/BV < 100% - Niedowartościowane akcje",
      score: pbv + "%",
    },
    {
      id: 3,
      title: "Poziom Dywidendy Wynosi: ",
      info: "Poziom Dywidendy określa jaki % wartości akcji spółka po roku daje dodatkowo jej posiadaczowi. Dobry poziom dywidendy oscyluje w granicach 8%",
      score: dividendYield + "%",
    },
    {
      id: 4,
      title: "Współczynnik Wypłat Dywidendy Wynosi: ",
      info: "Współczynnik Wypłat Dywidendy określa jaki % spółka przeznacza ze swoich Rocznych zysków na wypłaty dywidendy. Zdrowy poziom dla spółki oscyluje w granicach 40% a na pewno nie powinien przekraczać 100%",
      score: dividendPayoutRatio + "%",
    },
    {
      id: 5,
      title: "ROE wynosi: ",
      info: "ROE - Return On Equality czyli gotówna w relacji do zadłużenia. Wskaźnik ten pokazuje wysokość potencjału spółki do generowania zysków. Wyraża w procentach zysk netto spółki w porównaniu z jej kapitałem ROE może zostać zawyżone gdy spółka się zadłuży lub dokona jednorazowej sprzedaży majątku ROE < 10% - źle 10% < ROE < 20% - neutralnie 20% < ROE < 30% - dobrze ROE > 30% - bardzo dobrze",
      score: roe + "%",
    },
    {
      id: 6,
      title: "F-Score wynosi: ",
      info: "F-Score - wskaźnik Piotroskiego, pokazuje jak sytuacja finansowa spółki poprawiła się (wynik bliżej 9) czy pogorszyła (wynik bliżej 0). Spółce przyznajemy po punkcie za każde zgadzające się zdanie. F-Score daje obraz zmiany w stosunku do poprzedniego roku, przy tym wskaźniku ważne jest upenwienie się że firma nie działa w złej branży w złym czasie",
      score: checkedOptions.length,
    },
  ];

  function handleHelpClick(e) {
    setShowPopup(true);
    const contentInfo = e.currentTarget.getAttribute("contentInfo");
    setPopupContent(contentInfo);
    document.body.classList.add("blur");
  }
  return (
    <div className="result">
      {score.map(({ id, score, title, info }) => {
        return (
          <p key={id} className="result__item">
            {title}
            {score}
            <span
              contentInfo={info}
              className="result__item-info"
              onClick={handleHelpClick}
            >
              {" "}
              [?]
            </span>
          </p>
        );
      })}
      {showPopup && (
        <Popup content={popupContent} setShowPopup={setShowPopup} />
      )}
    </div>
  );
};
export default CompanyValutionResult;
