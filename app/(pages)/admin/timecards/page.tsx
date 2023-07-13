'use client'

import Link from "next/link";
import { useState } from "react";
import Header from "@components/header";
import { FaEye } from "react-icons/fa";
import SelectPeriod from "./_components/selectPeriod";

export default function TimeCards() {


  // Dummy employee data for demonstration
  const employees = [
    {
      id: "1",
      name: "John Doe",
      code: "E001",
      department: "Department 1",
      companyId: "C001",
      isClockedIn: false,
      totalHours: 40,
    },
    {
      id: "2",
      name: "Jane Smith",
      code: "E002",
      department: "Department 2",
      companyId: "C001",
      isClockedIn: true,
      totalHours: 35,
    },
    // ...
  ];

 

  return (
    <div className="h-screen">
      <Header />
      <SelectPeriod />
      <div className="flex-col">
     

        <div className="border p-4">
          <h2>Employee Hours</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Dept</th>
                <th className="px-4 py-2">Code</th>
                <th className="px-4 py-2">Total Hours</th>
                <th className="px-4 py-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-4 py-2">{employee.name}</td>
                  <td className="px-4 py-2">{employee.department}</td>
                  <td className="px-4 py-2">{employee.code}</td>
                  <td className="px-4 py-2">{employee.totalHours}</td>
                  <td className="px-4 py-2">
                    <Link href={`/admin/timecards/${employee.code}`}>
                      <button className="bg-blue-500 text-white px-2 py-1 rounded">
                        <FaEye />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
