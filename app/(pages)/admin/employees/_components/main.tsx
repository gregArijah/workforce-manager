import Link from "next/link";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

interface MainProps {
    employees: any;//{ name: string; code: string }[];
    setView: (view: any) => void;
    }

export default function Main({ employees, setView }: MainProps){ 

    function handleClick (e:any)  {
        setView('view'); 
    }

    
    return(
       <div className="flex-col">
                <div className="border p-4 mb-4 flex justify-between">
                    <Link href='/admin' className="bg-blue-500 text-white px-4 py-2 rounded">Back</Link>
                    <button className="bg-green-500 text-white px-4 py-2 rounded">Add New</button>
                </div>
                <div className="border p-4 flex space-x-3 font-bold">
                <h2 style={{ width: "20%" }}>Name</h2>
                <h3 style={{ width: "10%" }}>Code</h3>
                <h3 style={{ width: "20%" }}>Dept</h3>
                <h3 style={{ width: "10%" }}>Clocked In</h3>
                {/* <h3 style={{ width: "20%" }}>Actions</h3> */}
                </div>

                {employees.map((employee:any) => (
                <div key={employee.id} className="border p-4 flex space-x-3 items-center">
                    <h2 onClick={handleClick}className="cursor-pointer underline" style={{ width: "20%" }}>
                    {employee.name}
                    </h2>
                    <h3 style={{ width: "10%" }}>{employee.code}</h3>
                    <p style={{ width: "20%" }}>{employee.department.name}</p>
                    <p style={{ width: "10%" }}>{employee.isClockedIn ? "Yes" : "No"}</p>
                    {/* <div className="flex space-x-2" style={{ width: "20%" }}>
                    <button className="bg-blue-500 text-white px-2 py-1 rounded">
                        <FaEye />
                    </button>
                    <button className="bg-green-500 text-white px-2 py-1 rounded">
                        <FaEdit />
                    </button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded">
                        <FaTrash />
                    </button>
                    </div> */}
                </div>
                ))}
            </div>
    )
}