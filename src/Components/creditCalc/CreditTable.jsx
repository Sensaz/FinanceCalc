import "../../Styles/CreditTable.sass";
import React from "react";
const CreditTable = ({ arrRkRef, arraysRk, isActive }) => {
  return (
    <>
      {isActive ? (
        <>
          <table>
            <thead>
              <tr>
                <th>Saldo Początkowe długu</th>
                <th>Odsetki</th>
                <th>Rata Kapitałowa</th>
                <th>Rata Płatności Kredytu</th>
                <th>Saldo Końcowe Długu</th>
              </tr>
            </thead>
            <tbody>
              {arrRkRef.current.map((_, index) => (
                <tr key={index}>
                  {arraysRk.map((el) => (
                    <td key={index + Math.random() * 300}>
                      {el.current[index].toFixed(2)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : null}
    </>
  );
};

export default React.memo(CreditTable);
