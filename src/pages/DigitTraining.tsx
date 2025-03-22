import { useNavigate } from "react-router-dom";
import DigitCanvas from "../components/digit-recognition/digit-canvas";
import DataTable from "../components/table/table";
import { useState } from "react";
import Pagination from "../components/pagination/pagination";

const DigitTraining = () => {
  const navigate = useNavigate();
  const [digit, setDigit] = useState("");
  const [dataset, setDataset] = useState<any>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const tableHeaders = [
    { title: "Digit", id: "digit", type: "text" },
    // { title: "Data", id: "data", type: "dataPreview" },
    { title: "Created On", id: "createdOn", type: "text" },
    { title: "", id: "delete", type: "delete" },
  ];

  const grayScaleCallback = (data: any) => {
    if (data) {
      const now = new Date();
      const formattedTime = now.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        month: "long",
        day: "numeric",
        year: "numeric",
        hour12: false, // Uses 24-hour format
      });

      console.log("Traning", data);
      const currDataset = [...dataset];

      currDataset.unshift({
        digit: digit,
        data: data,
        createdOn: formattedTime,
      });
      setDataset(currDataset);
    }
  };

  const rowActionCallback = (data: any) => {
    if (data.action == "delete") {
      const currDataset = [...dataset];
      currDataset.splice(data.index, 1);

      setDataset(currDataset);
    }
  };

  const clearTableData = () => {
    setDataset([]);
    setPageNumber(1);
  };

  const setDigitValue = (e: any) => {
    const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 1);
    setDigit(value);
  };

  const onPageChange = (page: number) => {
    setPageNumber(page);
  };

  const onSizeChange = (size: number) => {
    setPageNumber(1);
    setPageSize(size);
  };

  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="flex flex-col p-10">
      <div className="flex">
        <div className="flex flex-col gap-4">
          <div className="text-4xl">Model Training</div>
          <div className="w-1/2">
            We will train DeepDigit by providing labeled sample data. To begin
            training, specify your digit and draw it on the canvas. Click "Add"
            to include it in your dataset. 🚀✨
          </div>
        </div>

        <div className="">
          <button
            onClick={goBack}
            className="bg-warning text-white px-4 py-0.5  cursor-pointer"
          >
            Back
          </button>
        </div>
      </div>

      <div className="flex gap-20 justify-around">
        <div className="flex flex-col gap-4 mt-10">
          <div className="flex gap-4">
            <div className="text-lg">Digit:</div>
            <input
              className="text-center border-b-2 border-primary px-2 items-center w-10"
              type="text"
              inputMode="numeric"
              value={digit}
              onChange={setDigitValue}
            />
          </div>
          <DigitCanvas
            mode="train"
            style="p-4"
            getGrayScale={grayScaleCallback}
          />
        </div>

        <div className="flex flex-col w-160">
          <div className="flex justify-end my-2">
            <button
              onClick={clearTableData}
              className="px-4 bg-warning text-white rounded-md cursor-pointer"
            >
              Clear
            </button>
          </div>
          <DataTable
            rowData={dataset.slice(pageNumber - 1, pageNumber * pageSize)}
            headers={tableHeaders}
            rowActionCallback={rowActionCallback}
          />
          <Pagination
            className="pagination-bar"
            currentPage={pageNumber}
            totalCount={dataset.length}
            pageSize={pageSize}
            onPageChange={onPageChange}
            onSizeChange={onSizeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default DigitTraining;
