'use client';

import { useEffect, useState } from 'react';

import api from '../../../lib/api';

import {
  DndContext,
  DragEndEvent,
  useDroppable,
} from '@dnd-kit/core';

import TaskCard from '../../../components/TaskCard';

import { useParams } from 'next/navigation';

export default function ProjectBoard() {
  const params = useParams();

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] =
    useState('');

  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('token')
      : '';

  const fetchTasks = async () => {
    try {
      const response = await api.get(
        `/tasks/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.id) {
      fetchTasks();
    }
  }, [params?.id]);

  const createTask = async () => {
    try {
      await api.post(
        '/tasks',
        {
          title,
          description,
          status: 'TODO',
          projectId: Number(params.id),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTitle('');
      setDescription('');

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const updateTaskStatus = async (
    id: number,
    status: string,
  ) => {
    try {
      await api.patch(
        `/tasks/${id}`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDragEnd = async (
    event: DragEndEvent,
  ) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = Number(active.id);

    const newStatus = over.id.toString();

    await updateTaskStatus(
      taskId,
      newStatus,
    );
  };

  const renderTasks = (status: string) => {
    return tasks
      .filter(
        (task: any) =>
          task.status === status,
      )
      .map((task: any) => (
        <TaskCard
          key={task.id}
          task={task}
          deleteTask={deleteTask}
        />
      ));
  };

  const DroppableColumn = ({
    id,
    title,
    children,
  }: any) => {
    const { setNodeRef } = useDroppable({
      id,
    });

    return (
      <div
        ref={setNodeRef}
        className="bg-white/80 backdrop-blur-lg rounded-2xl p-5 shadow-xl border border-white/40 min-h-[500px]"
      >
        <h2 className="text-2xl font-bold mb-4">
          {title}
        </h2>

        {children}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 p-10">
      <h1 className="text-5xl font-extrabold mb-8 text-slate-800">
        Kanban Board
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow-xl mb-8">
        <input
          className="border p-3 rounded-xl w-full mb-4"
          placeholder="Task Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <textarea
          className="border p-3 rounded-xl w-full mb-4"
          placeholder="Task Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value,
            )
          }
        />

        <button
          onClick={createTask}
          className="bg-slate-900 hover:bg-slate-700 transition text-white px-6 py-3 rounded-xl"
        >
          Add Task
        </button>
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-3 gap-6">
          <DroppableColumn
            id="TODO"
            title="To Do"
          >
            {renderTasks('TODO')}
          </DroppableColumn>

          <DroppableColumn
            id="IN_PROGRESS"
            title="In Progress"
          >
            {renderTasks(
              'IN_PROGRESS',
            )}
          </DroppableColumn>

          <DroppableColumn
            id="DONE"
            title="Done"
          >
            {renderTasks('DONE')}
          </DroppableColumn>
        </div>
      </DndContext>
    </div>
  );
}