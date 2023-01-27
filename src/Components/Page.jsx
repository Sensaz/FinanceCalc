import { Route, Routes } from "react-router-dom";
import CompanyValutionCalc from "./companyValutionCalc/CompanyValutionCalc";
import CompoundInterestCalc from "./compoundInterestCalc/CompoundInterestCalc";
import CreditCalc from "./creditCalc/CreditCalc";

const Page = () => {
  return (
    <Routes>
      {/* <Route path="/" component={App} /> */}
      <Route path="/companyValutionCalc" element={<CompanyValutionCalc />} />
      <Route path="/compoundInterestCalc" element={<CompoundInterestCalc />} />
      <Route path="/creditCalc" element={<CreditCalc />} />
    </Routes>
  );
};

export default Page;
