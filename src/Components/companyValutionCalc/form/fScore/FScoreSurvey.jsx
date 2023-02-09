import CheckboxOption from "./CheckboxOption";
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
    value: "Marża na sprzedaży poprawiła się w porównaniu z poprzednim rokiem",
  },
  {
    id: 8,
    value: "Wartość wskaźnika rotacji aktywów jest wyższa niż przed rokiem",
  },
];

const FScoreSurvey = ({ checkedOptions, setCheckedOptions }) => {
  const handleCheckedOption = (id, isChecked) => {
    if (isChecked) {
      setCheckedOptions([...checkedOptions, id]);
    } else {
      setCheckedOptions(checkedOptions.filter((optionId) => optionId !== id));
    }
  };
  return fScoreOptions.map((option) => (
    <CheckboxOption
      key={option.id}
      {...option}
      checked={checkedOptions.includes(option.id)}
      onCheckedChange={(isChecked) => handleCheckedOption(option.id, isChecked)}
    />
  ));
};

export default FScoreSurvey;
