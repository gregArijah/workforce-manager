import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

interface EmployeeProps {
    setView: (view: any) => void;
    setEmployees: any //(dept: any) => void;
    employees: any;
    }

export default function View ({setView, setEmployees, employees}: EmployeeProps ){
    return (
        <div>
              <div className="border p-4 mb-4">
          <button onClick={()=>setView('main')} className="bg-blue-500 text-white px-4 py-2 rounded">Back</button>
        </div>
            <h1> View Employee Details Page</h1>
            <button className="bg-green-500 text-white px-2 py-1 rounded">
                        <FaEdit />
                    </button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded">
                        <FaTrash />
                    </button>
            {/* <button className="mr-2 bg-green-500 text-white px-4 py-2 rounded">
                Edit
              </button> */}

              {/* <button className="bg-red-500 text-white px-4 py-2 rounded">
                Delete
              </button> */}
            <p>name, code, dept </p>
            <p></p>
            <p></p>
        </div>
    )

}