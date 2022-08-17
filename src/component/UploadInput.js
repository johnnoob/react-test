import React from "react";
import { useGlobalContext } from "../context/context.js";

const UploadInput = ({ handle }) => {
  const { fileName } = useGlobalContext();
  return (
    <div className="container w-75">
      <p className="ms-1 mb-1 text-muted">
        {fileName ? fileName : "請上傳檔案"}
      </p>
      <div className="input-group mb-3">
        <label className="input-group-text" htmlFor="inputGroupFile01">
          上傳
        </label>
        <input
          type="file"
          className="form-control"
          id="inputGroupFile01"
          onChange={(e) => handle(e)}
        />
      </div>
    </div>
  );
};

export default UploadInput;
