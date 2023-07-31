'use client'

import { useState, useEffect } from 'react';
import Header from '../../_components/header';
import Main from './_components/main';
import AddDept from './_components/addDept';
import ViewDept from './_components/viewDept';

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
  const [view, setView] = useState('main'); // Explicitly specify the type
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
        {view == 'main' && <Main setView={setView} departments={departments}/>}
        {view == 'view' && <ViewDept setView={setView} departments={departments} setDepartments={setDepartments}/>}
        {view == 'add' && <AddDept setView={setView} departments={departments} setDepartments={setDepartments}/>}
        {view == 'edit' && <AddDept setView={setView} departments={departments} setDepartments={setDepartments}/>}
      </div>
    </div>
  );
}
