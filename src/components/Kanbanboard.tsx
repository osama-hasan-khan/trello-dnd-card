import { useMemo, useState } from "react";
import PlusIcons from "../icons/PlusIcons";
import { Column, Id } from "../types";
import ColumnContainer from "./ColumnContainer";
import { DndContext, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

const Kanbanboard = () => {
  const [columns, setColumns] = useState<Column[]>([]);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  return (
    <div
      className="m-auto flex min-h-screen w-full items-center overflow-x-auto
     overflow-y-hidden px-[40]"
    >
      <DndContext onDragStart={onDragStart}>
        <div className="m-auto flex gap-4">
          <div className="flex gap-2">
            <SortableContext items={columnsId}>
              {columns.map((col) => {
                return (
                  <ColumnContainer
                    key={col.id}
                    column={col}
                    deleteColumn={deleteColumn}
                  />
                );
              })}
            </SortableContext>
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

        <DragOverlay>
          {activeColumn && (
            <ColumnContainer
              column={activeColumn}
              key={activeColumn.id}
              deleteColumn={deleteColumn}
            />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );

  function createNewColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnToAdd]);
  }

  function deleteColumn(id: Id) {
    const filteredColumn = columns.filter((col) => col.id !== id);
    setColumns(filteredColumn);
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
    }
  }
};

function generateId() {
  return Math.floor(Math.random() * 10001);
}

export default Kanbanboard;
