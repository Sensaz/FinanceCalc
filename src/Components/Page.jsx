import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import CompanyValutionCalc from "./companyValutionCalc/CompanyValutionCalc";
import CompoundInterestCalc from "./compoundInterestCalc/CompoundInterestCalc";
import CreditCalc from "./creditCalc/CreditCalc";
import HomePage from "./HomePage";
import ErrorPage from "./ErrorPage";

const Page = () => {
  const location = useLocation();
  const negative = useNavigate();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        return negative("/");
      case "/companyValutionCalc":
        return negative("/companyValutionCalc");
      case "/compoundInterestCalc":
        return negative("/compoundInterestCalc");
      case "/creditCalc":
        return negative("/creditCalc");
      default:
        negative("/error");
    }
  }, [negative]);

  return (
    <Routes>
      <Route path="/" exact element={<HomePage />} />
      <Route path="/companyValutionCalc" element={<CompanyValutionCalc />} />
      <Route path="/compoundInterestCalc" element={<CompoundInterestCalc />} />
      <Route path="/creditCalc" element={<CreditCalc />} />
      <Route path="/error" element={<ErrorPage />} />
    </Routes>
  );
};

export default Page;
