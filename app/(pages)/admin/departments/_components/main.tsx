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
    departments: { name: string; code: string }[];
    setDepartments: (dept: any) => void;
    setView: (view: any) => void;
    setSelectedDept: (dept: any) => void;
    }

export default function Main({ departments, setDepartments, setView, setSelectedDept }: MainProps){
    function handleEdit(department:any){
      setSelectedDept(department);  
      setView('edit');
    }

    async function handleDelete(department:any){
       // setView('delete')
       const isConfirm:Boolean = confirm("Are you sure you want to delete this department?");
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
        {/* Render each department item */}
        {departments.map((department, index) => (
          <div key={index} className="border p-4 flex space-x-3">
            <h2 className="font-bold">{department.name}</h2>
            <h3 className="text-gray-500">{department.code}</h3>

            <div className="flex space-x-1">
                <button onClick={()=>handleEdit(department)} className="bg-green-500 text-white px-2 py-1 rounded">
                    <FaEdit />
                  </button>
                  <button onClick={()=>handleDelete(department)} className="bg-red-500 text-white px-2 py-1 rounded">
                    <FaTrash />
                  </button>
                  
            </div>
          </div>
        ))}
        </div>
    )
}