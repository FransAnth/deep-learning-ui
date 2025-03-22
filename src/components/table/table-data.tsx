import { Trash2 } from "lucide-react";
import {
  IDataTable,
  ITableHeader,
} from "../../interface/table/datatable-models";
import { useEffect, useRef, useState } from "react";

const DataTableBody = ({ rowData, headers, rowActionCallback }: IDataTable) => {
  const [currentRow, setCurretRow] = useState<any>(null);
  const outputCanvasRef = useRef<any>(null);
  const digitPixels = 360;

  // useEffect(() => {
  //   if (currentRow) {
  //     const { index, rowData } = currentRow;
  //     const outputCanvas = outputCanvasRef.current;
  //     const outputCtx = outputCanvas.getContext("2d");
  //     const outputImageData = outputCtx.createImageData(
  //       digitPixels,
  //       digitPixels
  //     );

  //     const pixelIndex = index * 4;
  //     outputImageData.data[pixelIndex] = rowData; // Red
  //     outputImageData.data[pixelIndex + 1] = rowData; // Green
  //     outputImageData.data[pixelIndex + 2] = rowData; // Blue
  //     outputImageData.data[pixelIndex + 3] = 255; // Alpha (Fully opaque)

  //     // Draw grayscale image onto the second canvas
  //     outputCtx.putImageData(outputImageData, 0, 0);
  //   }
  // }, [outputCanvasRef]);

  return (
    <tbody>
      {rowData.length ? (
        rowData.map((row: any, index: number) => (
          <tr
            key={index}
            className={`${index % 2 === 0 ? "bg-white" : "bg-secondary"} ${
              index === rowData.length - 1 ? " border-b-2 border-primary" : ""
            }`}
          >
            {headers.map((header: ITableHeader, headerIndex: number) => {
              if (header.type === "delete") {
                return (
                  <td className="p-3 pl-5" key={headerIndex}>
                    <button
                      onClick={() =>
                        rowActionCallback({ action: "delete", index: index })
                      }
                      className="text-white bg-warning p-1 rounded-md cursor-pointer"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                );
              } else if (header.type === "dataPreview") {
                // setCurretRow({ index: index, rowData: row[header.id] });

                return (
                  <td className="p-3 pl-5" key={headerIndex}>
                    <canvas
                      ref={outputCanvasRef}
                      width={20}
                      height={20}
                      className="border"
                    />
                  </td>
                );
              } else {
                return (
                  <td className="p-3 pl-5" key={headerIndex}>
                    {row[header.id]}
                  </td>
                );
              }
            })}
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan={headers.length}
            className="bg-secondary h-16 w-full text-center border-b-2 border-primary"
          >
            No data
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default DataTableBody;
