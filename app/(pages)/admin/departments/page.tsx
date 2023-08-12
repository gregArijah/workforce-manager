'use client'

import { useState, useEffect } from 'react';
import Header from '../../_components/header';
import Main from './_components/main';
import AddDept from './_components/add';
import EditDept from './_components/edit';

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
  const [departments, setDepartments] = useState<{ name: string; code: string; employees: any[]; }[]>([]); 
  const [selectedDept, setSelectedDept] = useState({}); 
  const [view, setView] = useState('main'); 
  useEffect(() => {
    const fetchData = async () => {
      const data = await getDepartments();
      setDepartments(data);
    };
    fetchData();
  }, []);

  return (
    <div className="h-screen p-2 md:p-12">
      <Header />

      <div className="flex-col">
        {view == 'main' && <Main setView={setView} departments={departments} setDepartments={setDepartments} setSelectedDept={setSelectedDept}/>}
        {view == 'add' && <AddDept setView={setView} departments={departments} setDepartments={setDepartments}/>}
        {view == 'edit' && <EditDept setView={setView} departments={departments} setDepartments={setDepartments} selectedDept={selectedDept}/>}
      </div>
    </div>
  );
}
