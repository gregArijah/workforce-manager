import Link from "next/link";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";



const deleteDepartment = async (department:String) => {
  
  const api = `/api/department/?departmentId=${department}`;

  const res = await fetch(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await res.json();
  return json;
};

interface MainProps {
    departments: { name: string; code: string, employees:any[] }[];
    setDepartments: (dept: any) => void;
    setView: (view: any) => void;
    setSelectedDept: (dept: any) => void;
    }

export default function Main({ departments, setDepartments, setView, setSelectedDept }: MainProps){
    console.log("departments", departments);

    function handleEdit(department:any){
      setSelectedDept(department);  
      setView('edit');
    }

    async function handleDelete(department:any){
       // setView('delete')
       const isConfirm:Boolean = confirm(`This action will delete all associated employees.\nAre you sure you want to continue?`);
       try{
    
          if (isConfirm){
              await deleteDepartment(department.id);
          
              const newDepartments = departments.filter((dept:any) => dept.id !== department.id);
              setDepartments(newDepartments);


          }
        }catch(err){
            console.log(err);
        }

    }

    function handleAdd(){
        setView('add');
    }


    return (
        
        <div>
            
        <div className="flex border p-4 mb-4 justify-between">
          <Link href='/admin' className="bg-blue-500 text-white px-4 py-2 rounded">Back</Link>
          <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2 rounded">Add New</button>
        </div>
        <table className="w-full">
        <thead>
        <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Code</th>
            <th className="px-4 py-2"># Employees</th>
            <th className="px-4 py-2"></th>
        </tr>
        </thead>
        <tbody>
        {departments.map((department, index) => (
            <tr key={department.code}>
            <td className="px-4 py-2">{department.name}</td>
            <td className="px-4 py-2">{department.code}</td>
            <td className="px-4 py-2">{department.employees.length}</td>
        
            
            <td className="px-4 py-2 space-x-1">
                <button onClick={()=>handleEdit(department)} className="bg-green-500 text-white px-2 py-1 rounded">
                    <FaEdit />
                </button>
                <button onClick={()=>handleDelete(department)} className="bg-red-500 text-white px-2 py-1 rounded">
                    <FaTrash />
                </button>   
            </td>
            </tr>
        ))}
        </tbody>
    </table>
    
        </div>
    )
}