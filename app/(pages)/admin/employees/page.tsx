'use client'

import { useState, useEffect } from "react";  
import Header from "../../_components/header";
import Main from "./_components/main";
import Add from "./_components/add";
import Edit from "./_components/edit";

const api = '/api/employee';

const getEmployees = async () => {
  const res = await fetch(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await res.json();
  return json;
};

export default function Employees() {
  const [employees, setEmployees] = useState<{ id: string; name: string; code: string; department: any ; isClockedIn: boolean }[]>([]); // Explicitly specify the type
  const [view, setView]  = useState('main'); // Explicitly specify the type
  const [selectedEmployee, setSelectedEmployee] = useState<{ id: string; name: string; code: string; department: any ; isClockedIn: boolean } | null>(null); // Explicitly specify the type

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEmployees();
      setEmployees(data);
    };
    fetchData();
  }, []);

  return (
    <div className="h-screen">
      <Header />
      {view == 'main' && <Main employees={employees} setView={setView} setEmployees={setEmployees} setSelectedEmployee={setSelectedEmployee}/>}
      {view == 'edit' && <Edit employees={employees} setView={setView} setEmployees={setEmployees} selectedEmployee={selectedEmployee} />}   
      {view == 'add' && <Add employees={employees} setView={setView} setEmployees={setEmployees} />}   

      
    </div>
  );
}
