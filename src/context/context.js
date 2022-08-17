import React, { useState, useContext, useEffect } from "react";
import * as XLSX from "xlsx";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [fileName, setFileName] = useState(null);
  const [sheetNames, setSheetNames] = useState(null);
  const [sheetData, setSheetData] = useState({});
  const [targetSheetData, setTargetSheetData] = useState(null);
  const [sortOrder, setSortOrder] = useState(true);
  const [sortHead, setSortHead] = useState("");

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
  const handleSort = (e) => {
    const targetHead = e.target.dataset.head;
    setSortHead(targetHead);
    setSortOrder(!sortOrder);
  };
  const sortData = (sortHead, sortOrder) => {
    return targetSheetData.sort((a, b) => {
      if (sortOrder) {
        return a[sortHead] - b[sortHead];
      } else {
        return b[sortHead] - a[sortHead];
      }
    });
  };
  useEffect(() => {
    if (targetSheetData) {
      setTargetSheetData(sortData(sortHead, sortOrder));
    }
  }, [sortOrder, sortHead, targetSheetData, sortData]);
  return (
    <AppContext.Provider
      value={{
        fileName,
        sheetNames,
        sheetData,
        targetSheetData,
        changeTargetSheet,
        handleExcel,
        handleSort,
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
