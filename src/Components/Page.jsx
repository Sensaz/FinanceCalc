import { Route, Routes } from "react-router-dom";
import CompanyValutionCalc from "./companyValutionCalc/CompanyValutionCalc";
import CompoundInterestCalc from "./compoundInterestCalc/CompoundInterestCalc";
import CreditCalc from "./creditCalc/CreditCalc";
import HomePage from "./HomePage";
import ErrorPage from "./ErrorPage";

const Page = () => {
  return (
    <Routes>
      <Route path="/" exact element={<HomePage />} />
      <Route path="/companyValutionCalc" element={<CompanyValutionCalc />} />
      <Route path="/compoundInterestCalc" element={<CompoundInterestCalc />} />
      <Route path="/creditCalc" element={<CreditCalc />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Page;
