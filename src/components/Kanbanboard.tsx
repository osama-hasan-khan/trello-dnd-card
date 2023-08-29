import { useState } from "react";
import PlusIcons from "../icons/PlusIcons";
import { Column } from "../types";

const Kanbanboard = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  console.log(columns);

  return (
    <div
      className="m-auto flex min-h-screen w-full items-center overflow-x-auto
     overflow-y-hidden px-[40]"
    >
      <div className="m-auto flex gap-4">
        <div className="flex gap-2">
          {columns.map((col) => {
            return <div className="">{col.title}</div>;
          })}
        </div>
        <button
          onClick={createNewColumn}
          className="h-[40px] w-[200px] cursor-pointer
         rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor
         p-4 ring-red-500 hover:ring-2 flex items-center gap-4"
        >
          <PlusIcons />
          Add to Column
        </button>
      </div>
    </div>
  );

  function createNewColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnToAdd]);
  }
};

function generateId() {
  return Math.floor(Math.random() * 10001);
}

export default Kanbanboard;
