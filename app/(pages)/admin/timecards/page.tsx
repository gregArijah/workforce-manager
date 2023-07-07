'use client'

import Link from "next/link";
import { useState } from "react";
import Header from "../../_components/header";
import { FaEye } from "react-icons/fa";

export default function TimeCards() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

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

  const handleView = () => {
    // Perform the desired action when the "View" button is clicked
    console.log('View button clicked!');
    // Add your logic here to handle the view action
  };
  
  const handleFromDateChange = (e:any) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e:any) => {
    setToDate(e.target.value);
  };

  return (
    <div className="h-screen">
      <Header />
      <div className="flex-col">
        <div className="border p-4">
            <h2 className="mb-2">Select Period</h2>
            <div className="flex space-x-4">
                <div className="flex flex-col">
                    <label htmlFor="fromDate" className="mb-2">
                    From:
                    </label>
                    <input
                    type="date"
                    id="fromDate"
                    value={fromDate}
                    onChange={handleFromDateChange}
                    className="px-2 py-1 rounded border"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="toDate" className="mb-2">
                    To:
                    </label>
                    <input
                    type="date"
                    id="toDate"
                    value={toDate}
                    onChange={handleToDateChange}
                    className="px-2 py-1 rounded border"
                    />
                </div>
                <button onClick={handleView} className="px-4 py-2 bg-blue-500 text-white rounded">
                    View
                </button>
            </div>

        </div>

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
