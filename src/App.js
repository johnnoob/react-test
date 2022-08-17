import { useState, useEffect } from "react";
import { UploadInput, Chart } from "./component/index.js";
import { useGlobalContext } from "./context/context.js";

function App() {
  const {
    sheetNames,
    targetSheetData,
    handleExcel,
    changeTargetSheet,
    handleSort,
  } = useGlobalContext();
  const [sheetHeads, setSheetHeads] = useState([]);
  useEffect(() => {
    if (targetSheetData) {
      const heads = Object.keys(targetSheetData[0]);
      setSheetHeads(heads);
    }
  }, [targetSheetData]);
  return (
    <main>
      <div className="title container text-center mb-2 mt-3">
        <h1>Excel表試做</h1>
        <p className="text-muted">試做而已...別鞭太大力</p>
      </div>
      <UploadInput handle={handleExcel} />
      {sheetNames && (
        <div className="container w-75 border p-3 rounded-2">
          <div className="container fluid d-flex justify-contet-center align-items-center flex-column">
            <header className="container text-center">
              <h2>表格</h2>
            </header>
            <div
              className="btn-group mb-3"
              role="group"
              aria-label="Basic example"
            >
              {sheetNames.map((name, index) => {
                return (
                  <button
                    key={index}
                    type="button"
                    className="btn btn-primary"
                    onClick={changeTargetSheet}
                  >
                    {name}
                  </button>
                );
              })}
            </div>
            {targetSheetData && (
              <div className="container fluid overflow-auto border p-2 text-center">
                <table className="table table-hover">
                  <thead>
                    <tr className="table-secondary">
                      {sheetHeads.map((head, index) => {
                        return (
                          <th scope="col" key={index}>
                            {head}
                            <span onClick={handleSort} data-head={head}>
                              排序
                            </span>
                          </th>
                        );
                      })}
                    </tr>
                    {targetSheetData.map((row, index) => {
                      console.log(targetSheetData);
                      return (
                        <tr key={index}>
                          {Object.entries(row).map((col, index) => {
                            console.log(col);
                            const [headName, value] = col;
                            return <td key={index}>{value}</td>;
                          })}
                        </tr>
                      );
                    })}
                  </thead>
                </table>
              </div>
            )}
          </div>
          {targetSheetData && (
            <div className="mt-3 container d-flex justify-content-center flex-column align-items-center">
              <h2>長條圖</h2>
              <Chart targetSheetData={targetSheetData} />
            </div>
          )}
        </div>
      )}
    </main>
  );
}

export default App;
