import React, { useState, useContext } from "react";
import * as XLSX from "xlsx";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [fileName, setFileName] = useState(null);
  const [sheetNames, setSheetNames] = useState(null);
  const [sheetData, setSheetData] = useState({});
  const [targetSheetData, setTargetSheetData] = useState(null);
  const handleExcel = async (e) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const wb = XLSX.read(data);
    setSheetNames(wb.SheetNames);
    const sheetContainer = {};
    wb.SheetNames.forEach((name) => {
      const ws = wb.Sheets[name];
      sheetContainer[name] = XLSX.utils.sheet_to_json(ws, {
        range: 0,
      });
    });
    setFileName(file.name);
    setSheetData(sheetContainer);
    setTargetSheetData(null);
  };
  const changeTargetSheet = (e) => {
    const tagetSheetName = e.target.textContent;
    setTargetSheetData(sheetData[tagetSheetName]);
  };
  return (
    <AppContext.Provider
      value={{
        fileName,
        sheetNames,
        sheetData,
        targetSheetData,
        changeTargetSheet,
        handleExcel,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
