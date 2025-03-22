import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePagination } from "./UsePagination";

const Pagination = (props: any) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    onSizeChange,
  } = props;

  const paginationRange: any = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  if (currentPage === null || totalCount === 0) {
    return null;
  }

  const onNext = () => {
    if (currentPage === lastPage) return;
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    if (currentPage === 1) return;
    onPageChange(currentPage - 1);
  };

  const pageIndex = () => {
    return (
      <ul className={"flex flex-row list-none gap-2 sm:gap-4 items-center"}>
        <li
          className={` ${currentPage === 1 ? "disabled" : "enabled"}   `}
          onClick={onPrevious}
        >
          <div
            className={` text-sm text-semibold cursor-pointer min-w-max  ${
              currentPage === 1 ? "text-gray-300" : "text-black"
            } `}
          >
            <ChevronLeft />
          </div>
        </li>
        <li
          className={`${currentPage === lastPage ? "disabled" : "enabled"} `}
          onClick={onNext}
        >
          <div
            className={`text-sm text-semibold cursor-pointer min-w-max ${
              currentPage === lastPage ? "text-gray-300" : "text-black"
            } `}
          >
            <ChevronRight />
          </div>
        </li>
      </ul>
    );
  };

  let lastPage = paginationRange[paginationRange?.length - 1];
  console.log("LAST");
  console.log(lastPage);

  return (
    <div className="flex-col">
      <div className="flex justify-center items-center pt-4 gap-2">
        <div className="flex flex-row gap-2 w-full justify-center items-center">
          <span className="text-sm">Row per page:</span>
          <select
            value={pageSize}
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-secondary focus:border-secondary block min-w-[5.5rem]  p-2.5"
            onChange={(e) => {
              onSizeChange(parseInt(e?.target.value));
            }}
          >
            {[5, 10, 20, 50, 100].map((item) => (
              <option key={item} value={item}>
                {item} rows
              </option>
            ))}
          </select>
          <div className="flex flex-row text-sm text-light">
            {pageSize > totalCount
              ? 1
              : Math.ceil(currentPage * pageSize) + 1 - pageSize}{" "}
            -{" "}
            {pageSize > totalCount
              ? totalCount
              : currentPage * pageSize > totalCount
              ? totalCount
              : Math.ceil(currentPage * pageSize)}{" "}
            of {totalCount}
          </div>
          {pageIndex()}
        </div>
        <div className="justify-center flex xs:flex lg:hidden">
          {pageIndex()}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
