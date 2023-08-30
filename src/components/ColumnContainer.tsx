import { useSortable } from "@dnd-kit/sortable";
import TrashIcon from "../icons/TrashIcon";
import { Column, Id } from "../types";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
}

const ColumnContainer = (props: Props) => {
  const { column, deleteColumn, updateColumn } = props;
  const [editMode, setEditMode] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column: column,
    },
    disabled: editMode,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <div
        style={style}
        ref={setNodeRef}
        className="bg-columnBackgroundColor w-[250px] h-[380px] rounded-md flex flex-col opacity-60 border-2 border-rose-500"
      ></div>
    );
  }

  return (
    <div
      style={style}
      ref={setNodeRef}
      className="bg-columnBackgroundColor w-[250px] h-[380px] rounded-md flex flex-col"
    >
      {/* column title */}
      <div
        onClick={() => setEditMode(true)}
        {...attributes}
        {...listeners}
        className="bg-mainBackgroundColor text-sm font-mono
       cursor-grab rounded-md h-[40px] rounded-b-none p-2
       font-bold border-columnBackgroundColor border-4 flex items-center justify-between"
      >
        <div className="flex gap-2 items-center">
          <div className="flex justify-center items-center bg-columnBackgroundColor px-2 py-1 text-sm rounded-full">
            0
          </div>
          {!editMode && column.title}
          {editMode && (
            <input
              className="bg-black focus:border-rose-500 border rounded outline-none px-2"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          )}
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
      <div className="">Footer </div>
    </div>
  );
};

export default ColumnContainer;
