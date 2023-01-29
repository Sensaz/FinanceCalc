import "../../Styles/CreditTable.sass";

const CreditTable = ({
  arrSpdRef,
  arrOdsRef,
  arrRkRef,
  arrRpkRef,
  arrSkdRef,
  isActive,
}) => {
  const allArray = [arrSpdRef, arrOdsRef, arrRkRef, arrRpkRef, arrSkdRef];
  return (
    <>
      {isActive ? (
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
                {allArray.map(
                  (el) => (
                    <td key={index + Math.random() * 300}>
                      {el.current[index].toFixed(2)}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </>
  );
};

export default CreditTable;
