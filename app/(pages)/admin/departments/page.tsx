'use client'

import { useState, useEffect } from 'react';
import Header from '../../_components/header';

const api = '/api/department';

const getDepartments = async () => {
  const res = await fetch(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await res.json();
  return json;
};

export default function Departments() {
  const [departments, setDepartments] = useState<{ name: string; code: string }[]>([]); // Explicitly specify the type

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDepartments();
      setDepartments(data);
    };
    fetchData();
  }, []);

  return (
    <div className="h-screen">
      <Header />

      <div className="flex-col">
        <div className="border p-4 mb-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Add New
          </button>
        </div>
        {/* Render each department item */}
        {departments.map((department, index) => (
          <div key={index} className="border p-4 flex space-x-3">
            <h2 className="font-bold">{department.name}</h2>
            <h3 className="text-gray-500">{department.code}</h3>

            <div className="flex mt-2">
              <button className="mr-2 bg-blue-500 text-white px-4 py-2 rounded">
                View
              </button>
              <button className="mr-2 bg-green-500 text-white px-4 py-2 rounded">
                Edit
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
