import { IDataTable } from "../../interface/table/datatable-models";
import DataTableBody from "./table-data";
import DataTableHead from "./table-header";

const DataTable = ({ headers, rowData, rowActionCallback }: IDataTable) => {
  return (
    <table className="border-collapse rounded-t-md overflow-hidden">
      <DataTableHead headers={headers} />
      <DataTableBody
        headers={headers}
        rowData={rowData}
        rowActionCallback={rowActionCallback}
      />
    </table>
  );
};

export default DataTable;
