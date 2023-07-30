'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@components/header";
import { FaEye } from "react-icons/fa";
import SelectPeriod from "../_components/selectPeriod";

const employees = [
  {
    id: "1",
    name: "John Doe",
    code: "E001",
    department: "Department 1",
    companyId: "C001",
    isClockedIn: false,
    totalHours: 40,
    entries: [
      {
        id: "1",
        date: "2023-07-01",
        timeIn: "09:00 AM",
        timeOut: "05:00 PM",
        total: "8",
        periodTotal: "8",
      },
      // ... Add more entries for John Doe if needed
      {
        id: "2",
        date: "2023-07-02",
        timeIn: "09:00 AM",
        timeOut: "05:00 PM",
        total: "8",
        periodTotal: "16",
      },
      {
        id: "3",
        date: "2023-07-03",
        timeIn: "09:00 AM",
        timeOut: "05:00 PM",
        total: "8",
        periodTotal: "24",
      },
      {
        id: "4",
        date: "2023-07-04",
        timeIn: "09:00 AM",
        timeOut: "05:00 PM",
        total: "8",
        periodTotal: "32",
      },
      {
        id: "5",
        date: "2023-07-05",
        timeIn: "09:00 AM",
        timeOut: "05:00 PM",  
        total: "8",
        periodTotal: "40",
      },
    ],
  },
  {
    id: "2",
    name: "Jane Smith",
    code: "E002",
    department: "Department 2",
    companyId: "C001",
    isClockedIn: true,
    totalHours: 35,
    entries: [
      {
        id: "1",
        date: "2023-07-01",
        timeIn: "09:00 AM",
        timeOut: "05:00 PM",
        total: "8",
        periodTotal: "8",
      },
      {
        id: "2",
        date: "2023-07-02",
        timeIn: "09:00 AM",
        timeOut: "05:00 PM",
        total: "8",
        periodTotal: "16",
      },
      {
        id: "3",
        date: "2023-07-03",
        timeIn: "09:00 AM",
        timeOut: "05:00 PM",
        total: "8",
        periodTotal: "24",
      },
      {
        id: "4",
        date: "2023-07-04",
        timeIn: "09:00 AM",
        timeOut: "05:00 PM",
        total: "8",
        periodTotal: "32",
      },
      {
        id: "5",
        date: "2023-07-05",
        timeIn: "09:00 AM",
        timeOut: "05:00 PM",  
        total: "8",
        periodTotal: "40",
      },
    ],
  },
];


interface Employee {
  id: string;
  name: string;
  code: string;
  department: string;
  companyId: string;
  isClockedIn: boolean;
  totalHours: number;
  entries: {
    id: string;
    date: string;
    timeIn: string;
    timeOut: string;
    total: string;
    periodTotal: string;
  }[];
}

interface PageProps {
  id: string;
}

export default function Details({ params }: { params: { id: string } }) {
  //const router = useRouter();
  const { id } = params;

  const employee = employees.find((employee) => employee.code === id);

  if (!employee) {
    return <div>Employee not found</div>;
  }

  const currentIndex = employees.findIndex((emp) => emp.code === id);

  return (
    <div className="h-screen">
      <Header />
      {/* <SelectPeriod />  */}
      <div className="flex-col">
        <h2 className="text-2xl font-bold mb-4">Details</h2>
        <h3 className="text-lg font-bold mb-2">Name: {employee.name}</h3>
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Time In</th>
              <th className="px-4 py-2">Time Out</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Period Total</th>
            </tr>
          </thead>
          <tbody>
            {employee.entries.map((entry) => (
              <tr key={entry.id}>
                <td className="px-4 py-2">{entry.date}</td>
                <td className="px-4 py-2">{entry.timeIn}</td>
                <td className="px-4 py-2">{entry.timeOut}</td>
                <td className="px-4 py-2">{entry.total}</td>
                <td className="px-4 py-2">{entry.periodTotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <strong>Total Hours:</strong> {employee.totalHours}
        </div>
        
         <div className="flex justify-between mt-4">
          <Link href={`admin/timecards/${employees[currentIndex === 0 ? employees.length - 1 : currentIndex - 1].code}`}>
            <button className="px-4 py-2 bg-blue-500 text-white rounded">Previous</button>
          </Link>
          <Link href={`admin/timecards/${employees[(currentIndex + 1) % employees.length].code}`}>
            <button className="px-4 py-2 bg-blue-500 text-white rounded">Next</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
