'use client';

import {
  useDraggable,
} from '@dnd-kit/core';

export default function TaskCard({
  task,
  deleteTask,
}: any) {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: task.id,
    });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-white p-4 rounded-xl mb-4 shadow-md hover:shadow-xl transition-all duration-200 border cursor-grab"
    >
      <h3 className="font-bold text-lg">
        {task.title}
      </h3>

      <p className="text-gray-600 mb-3">
        {task.description}
      </p>

      <button
        onClick={() => deleteTask(task.id)}
        className="bg-red-500 text-white px-3 py-2 rounded"
      >
        Delete
      </button>
    </div>
  );
}