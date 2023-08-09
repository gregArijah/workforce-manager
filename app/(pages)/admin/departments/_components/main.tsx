import Link from "next/link";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';



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

    const columns: GridColDef[] = [
        { field: 'Department', headerName: 'Department', width: 250 },
        { field: 'Code', headerName: 'Code', width: 150 },
        { field: 'Employees', headerName: 'Employees', width: 150 },
        { field: 'Actions', headerName: 'Actions', width: 150, 
        renderCell: (cellValues) => {
            const department = cellValues.row;
    ;        return (
                <div className="space-x-1">
                    <button onClick={()=>handleEdit(department)} className="bg-blue-500 text-white p-1.5  rounded">
                        <FaEdit />
                    </button>
                    <button onClick={()=>handleDelete(department)} className="bg-blue-500 text-white p-1.5 rounded">
                        <FaTrash />
                    </button>   
                </div>
            );
          } },
      ]
    
    const rows: GridRowsProp = departments.map((department:any) => (
        { 
            id: department.id, 
            Department: department.name, 
            Code: department.code, 
            Employees: department.employees.length,
        }
    ));


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
        {/* <table className="w-full">
        <thead>
        <tr>
            <th className="px-4 py-2">Department</th>
            <th className="px-4 py-2">Code</th>
            <th className="px-4 py-2">Employees</th>
            <th className="px-4 py-2">Actions</th>
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
    <hr />
    <hr />
    <br />
    <p className="text-xl underline text-red-500">The table style below will replace the table style above on all pages, once i figure out how to include those buttons!!</p>
    <hr />
    <hr /> */}

    {/* <div style={{ height: max-content, width: '100%' }}> */}
    <div className="h-full">
      <DataGrid rows={rows} columns={columns} />
    </div>
    
        </div>
    )
}