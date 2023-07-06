'use client'
// export default function Employees() {
//     return (
//         <div className="h-screen">
//             Employee Section
//         </div>
//     )
// }
import Header from "../../_components/header";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

export default function Employees() {
  const employees = [
    {
      id: "1",
      name: "John Doe",
      code: "E001",
      department: "Department 1",
      companyId: "C001",
      isClockedIn: false,
    },
    {
      id: "2",
      name: "Jane Smith",
      code: "E002",
      department: "Department 2",
      companyId: "C001",
      isClockedIn: true,
    },
    // ...
  ];

  return (
    <div className="h-screen">
      <Header />

      <div className="flex-col">
        <div className="border p-4 flex space-x-3 font-bold">
          <h2 style={{ width: "20%" }}>Name</h2>
          <h3 style={{ width: "10%" }}>Code</h3>
          <h3 style={{ width: "20%" }}>Dept</h3>
          <h3 style={{ width: "20%" }}>Company ID</h3>
          <h3 style={{ width: "10%" }}>Clocked In</h3>
          <h3 style={{ width: "20%" }}>Actions</h3>
        </div>

        {employees.map((employee) => (
          <div key={employee.id} className="border p-4 flex space-x-3 items-center">
            <h2 className="cursor-pointer underline" style={{ width: "20%" }}>
              {employee.name}
            </h2>
            <h3 style={{ width: "10%" }}>{employee.code}</h3>
            <p style={{ width: "20%" }}>{employee.department}</p>
            <p style={{ width: "20%" }}>{employee.companyId}</p>
            <p style={{ width: "10%" }}>{employee.isClockedIn ? "Yes" : "No"}</p>
            <div className="flex space-x-2" style={{ width: "20%" }}>
              <button className="bg-blue-500 text-white px-2 py-1 rounded">
                <FaEye />
              </button>
              <button className="bg-green-500 text-white px-2 py-1 rounded">
                <FaEdit />
              </button>
              <button className="bg-red-500 text-white px-2 py-1 rounded">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
