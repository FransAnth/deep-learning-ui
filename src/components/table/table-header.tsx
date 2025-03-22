import {
  ITableHeader,
  ITableHeaders,
} from "../../interface/table/datatable-models";

const DataTableHead = ({ headers }: ITableHeaders) => {
  return (
    <thead>
      <tr className="bg-primary text-left rounded-2xl">
        {headers.map((header: ITableHeader, index: number) => (
          <th key={index} className="text-white p-3 pl-5">
            {header.title}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default DataTableHead;
