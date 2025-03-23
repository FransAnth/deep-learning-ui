import { useNavigate } from "react-router-dom";
import DigitCanvas from "../components/digit-recognition/digit-canvas";
import DataTable from "../components/table/table";
import { useState } from "react";
import Pagination from "../components/pagination/pagination";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addDataset,
  getDatasetDbInfo,
} from "../services/digit-recognition-services";
import Loader from "../components/global/loader";
import Modal from "../components/modals";
import { CheckCircle2, CloudAlert } from "lucide-react";

const DigitTraining = () => {
  const navigate = useNavigate();
  const [digit, setDigit] = useState("");
  const [dataset, setDataset] = useState<any>([]);
  const [dataTable, refreshDataTable] = useState<boolean>(false);
  const [dbInfo, setDbInfo] = useState<any>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // ModalControls
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
  const [successModalOpen, setSuccessModalOpen] = useState<boolean>(false);
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);

  const tableHeaders = [
    { title: "Label", id: "label", type: "text" },
    // { title: "Feature", id: "features", type: "dataPreview" },
    { title: "Created On", id: "createdOn", type: "text" },
    { title: "", id: "delete", type: "delete" },
  ];

  const datasetDbInfo = [
    { title: "Label", id: "label", type: "text" },
    { title: "DB Count", id: "count", type: "text" },
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
        label: digit,
        features: data,
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

  const { isLoading: addingDatasets, mutate: addNewDataset } = useMutation({
    mutationFn: addDataset,
    onSuccess: (response: any) => {
      console.log("Add Dataset Response", response);

      setDataset([]);
      refreshDataTable(!dataTable);
      setSuccessModalOpen(true);
      setConfirmModalOpen(false);
    },
    onError: (error: any) => {
      console.log("Add Dataset Error", error);

      setErrorModalOpen(true);
      setConfirmModalOpen(false);
    },
  });

  useQuery({
    queryKey: ["DatasetDbInfoQuery", dataTable],
    queryFn: async () => {
      const { data } = await getDatasetDbInfo();
      console.log("DB INFO", data);
      setDbInfo(data);
    },
  });

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
      <div className="flex justify-between">
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
          <div className="flex justify-center">
            <button
              className={`py-2 px-4 text-white rounded-md cursor-pointer ${
                dataset.length == 0 ? "bg-secondary" : "bg-primary"
              }`}
              onClick={() => setConfirmModalOpen(true)}
              disabled={dataset.length == 0}
            >
              Save Dataset
            </button>
          </div>
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
            rowData={dataset.slice(
              (pageNumber - 1) * pageSize,
              pageNumber * pageSize
            )}
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
        <div className="flex flex-col gap-4">
          <div className="text-center">Dataset Info</div>
          <DataTable rowData={dbInfo} headers={datasetDbInfo} />
        </div>
      </div>
      {addingDatasets && <Loader />}

      <Modal
        title="Confirmation"
        isOpen={confirmModalOpen}
        closeModalAction={setConfirmModalOpen}
        className="w-100"
        children={
          <div className="flex flex-col gap-4 items-center pt-8">
            <span className="text-xl">Confirm Save datasets?</span>
            <div className="flex gap-8 mt-4">
              <button
                className="bg-primary px-4 py-2 text-white rounded-lg cursor-pointer"
                onClick={() => addNewDataset(dataset)}
              >
                Confirm
              </button>
              <button
                className="bg-warning px-4 py-2 text-white rounded-lg cursor-pointer"
                onClick={() => setConfirmModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        }
      />

      <Modal
        title="Success"
        isOpen={successModalOpen}
        closeModalAction={setSuccessModalOpen}
        className="w-100"
        children={
          <div className="flex flex-col items-center text-center gap-4 py-4">
            <CheckCircle2 size={80} className="text-green-500" />
            <div className="w-50 flex flex-col gap-2">
              <span className="text-lg">SUCCESS!</span>
              <span className="text-sm">
                Dataset has been added to the database.
              </span>
            </div>

            <button
              className="bg-primary text-white px-4 py-2 rounded-lg cursor-pointer mt-4"
              onClick={() => setSuccessModalOpen(false)}
            >
              Okay
            </button>
          </div>
        }
      />

      <Modal
        title="Error"
        isOpen={errorModalOpen}
        closeModalAction={setErrorModalOpen}
        className="w-100"
        children={
          <div className="flex flex-col items-center text-center gap-2 py-4">
            <CloudAlert size={80} className="text-red-500" />
            <div className="w-50 flex flex-col gap-2">
              <span className="text-lg">Opps!</span>
              <span className="text-sm">
                An error occurred while processing your request.
              </span>
            </div>

            <button
              className="bg-primary text-white px-4 py-2 rounded-lg cursor-pointer mt-4"
              onClick={() => setErrorModalOpen(false)}
            >
              Okay
            </button>
          </div>
        }
      />
    </div>
  );
};

export default DigitTraining;
