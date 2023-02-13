import { NavLink } from "react-router-dom";
import "../Styles/Navigation.sass";
const nav = [
  {
    id: 0,
    path: "",
    content: "Strona główna",
  },
  {
    id: 1,
    path: "/companyValutionCalc",
    content: "Kalkulator wyceny spółek",
  },
  {
    id: 2,
    path: "/compoundInterestCalc",
    content: "Kalkulator procentu składanego",
  },
  {
    id: 3,
    path: "/creditCalc",
    content: "Kalkulator kredytu",
  },
];

const Navigation = () => {
  const links = nav.map((link) => (
    <li className="list__item" key={link.id}>
      <NavLink to={link.path}>{link.content}</NavLink>
    </li>
  ));
  return <ul className="list">{links}</ul>;
};

export default Navigation;
