'use client';

import { useEffect, useState } from 'react';
import api from '../../lib/api';
import { useRouter } from 'next/navigation';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] =
    useState('');

  const router = useRouter();

  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('token')
      : '';

  const fetchProjects = async () => {
    try {
      const response = await api.get(
        '/projects',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setProjects(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async () => {
    try {
      await api.post(
        '/projects',
        {
          name,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setName('');
      setDescription('');

      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProject = async (id: number) => {
    try {
      await api.delete(`/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="flex justify-between items-center mb-8">
  <h1 className="text-4xl font-bold">
    Projects
  </h1>

  <button
    onClick={() => {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }}
    className="bg-red-500 text-white px-5 py-3 rounded"
  >
    Logout
  </button>
</div>

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <input
          className="border p-3 rounded w-full mb-4"
          placeholder="Project Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <textarea
          className="border p-3 rounded w-full mb-4"
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <button
          onClick={createProject}
          className="bg-black text-white px-6 py-3 rounded"
        >
          Create Project
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {projects.map((project: any) => (
          <div
            key={project.id}
            className="bg-white p-6 rounded-lg shadow"
          >
            <h2 className="text-2xl font-bold mb-2">
              {project.name}
            </h2>

            <p className="text-gray-600 mb-4">
              {project.description}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() =>
                  router.push(
                    `/projects/${project.id}`,
                  )
                }
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Open
              </button>

              <button
                onClick={() =>
                  deleteProject(project.id)
                }
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}