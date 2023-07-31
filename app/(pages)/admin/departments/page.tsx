'use client'

import { useState, useEffect } from 'react';
import Header from '../../_components/header';
import Main from './_components/main';

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
        <Main departments={departments}/>
        
      </div>
    </div>
  );
}
