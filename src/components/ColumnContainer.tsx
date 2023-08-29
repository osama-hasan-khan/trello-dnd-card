import TrashIcon from "../icons/TrashIcon";
import { Column, Id } from "../types";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
}

const ColumnContainer = (props: Props) => {
  const { column, deleteColumn } = props;
  return (
    <div className="bg-columnBackgroundColor w-[250px] h-[380px] rounded-md flex flex-col">
      {/* column title */}
      <div
        className="bg-mainBackgroundColor text-sm font-mono
       cursor-grab rounded-md h-[40px] rounded-b-none p-2
       font-bold border-columnBackgroundColor border-4 flex items-center justify-between"
      >
        <div className="flex gap-2 items-center">
          <div className="flex justify-center items-center bg-columnBackgroundColor px-2 py-1 text-sm rounded-full">
            0
          </div>
          {column.title}
        </div>
        <button
          onClick={() => deleteColumn(column.id)}
          className="stroke-gray-500 hover:stroke-white
         hover:bg-columnBackgroundColor rounded px-1 py-1"
        >
          <TrashIcon />
        </button>
      </div>

      {/* column task container */}

      <div className="flex flex-grow">Content</div>

      {/* column footer */}
    </div>
  );
};

export default ColumnContainer;
