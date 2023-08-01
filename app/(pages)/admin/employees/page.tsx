'use client'

import { useState, useEffect } from "react";  
import Header from "../../_components/header";
import Main from "./_components/main";
import View from "./_components/view";

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
      {view == 'main' && <Main employees={employees} setView={setView} />}
      {view == 'view' && <View employees={employees} setView={setView} setEmployees={setEmployees} />}   

      
    </div>
  );
}
