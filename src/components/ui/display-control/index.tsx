import { useEffect, useState } from "react";
import { URLSearchParamsInit } from "react-router-dom";

type DisplayOptions = {
  columns: number[];
  selectedColumn: number;
};

const displayOptions: DisplayOptions = {
  columns: [4, 5, 6],
  selectedColumn: 5,
};

type DispalyControlProps = {
  setSelectedGrid: (number: number) => void;
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParamsInit) => void;
};

const DispalyControl = ({
  setSelectedGrid,
  searchParams,
  setSearchParams,
}: DispalyControlProps) => {
  const [display, setDisplay] = useState<number>(
    +(searchParams.get("column") as string) || displayOptions.selectedColumn
  );

  const changeColumnHandler = () => {
    if (displayOptions.columns.length > 1) {
      const length = displayOptions.columns.length;
      const selectedIndex = displayOptions.columns.indexOf(display);
      console.log(length, "/", selectedIndex);
      const newDisplayValue =
        selectedIndex < length - 1
          ? displayOptions.columns[selectedIndex + 1]
          : displayOptions.columns[0];
      setDisplay(newDisplayValue);
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        column: `${newDisplayValue}`,
      });
    }
  };

  useEffect(() => {
    setSelectedGrid(display);
  }, [display, setSelectedGrid]);

  //   console.log(display);

  return (
    <div className="flex gap-3 items-center">
      <button
        onClick={changeColumnHandler}
        className="flex items-stretch
    border border-zinc-800 bg-zinc-800
     rounded-md overflow-hidden"
      >
        <span className="flex items-center px-3">
          <i className="flex fi fi-rr-apps"></i>
        </span>
        <span className="text-lg py-2 px-3 bg-zinc-900">{display} Column</span>
      </button>
    </div>
  );
};
export default DispalyControl;
