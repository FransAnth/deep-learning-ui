export interface ITableHeader {
  title: string;
  type: string;
  id: string;
}

export interface ITableHeaders {
  headers: ITableHeader[];
}

export interface IRowData {
  rowData: any[];
  rowActionCallback: (data: any) => void;
}

export interface IDataTable extends ITableHeaders, IRowData {}
