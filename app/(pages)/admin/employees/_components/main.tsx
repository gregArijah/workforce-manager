import Link from "next/link";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

const deleteEmployee = async (employee:String) => {
  
    const api = `/api/employee/?employeeId=${employee}`;
  
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
    employees: any;//{ name: string; code: string }[];
    setEmployees: (employee: any) => void;
    setView: (view: any) => void;
    setSelectedEmployee: (employee: any) => void;
    }

export default function Main({ employees,setEmployees, setView, setSelectedEmployee }: MainProps){ 
    
    const columns: GridColDef[] = [
        { field: 'Name', headerName: 'Name', width: 250 },
        { field: 'Code', headerName: 'Code', width: 150 },
        { field: 'Department', headerName: 'Department', width: 150 },
        { field: 'Clocked In', headerName: 'Clocked In', width: 150 },
        { field: 'Actions', headerName: 'Actions', width: 150, 
        renderCell: (cellValues) => {
            const employee = cellValues.row;
            return (
                <div className="space-x-1">
                    <button onClick={()=>handleEdit(employee)} className="bg-blue-500 text-white p-1.5  rounded">
                        <FaEdit />
                    </button>
                    <button onClick={()=>handleDelete(employee)} className="bg-blue-500 text-white p-1.5 rounded">
                        <FaTrash />
                    </button>   
                </div>
            );
          } },
      ];

    const rows: GridRowsProp = employees.map((employee:any) => (
        { 
            id: employee.id, 
            Name: employee.name, 
            Code: employee.code, 
            Department: employee.department.code,
            "Clocked In": employee.isClockedIn ? "Yes" : "No",
            DepartmentId: employee.department.id,
        } 
    ));      

    async function handleDelete(employee:any){
        // setView('delete');
        
        const isConfirm:Boolean = confirm("Are you sure you want to delete this employee?");
        try{
           if (isConfirm){
               await deleteEmployee(employee.id);
 
               const newEmployees = employees.filter((empl:any) => empl.id !== employee.id);
               setEmployees(newEmployees);
 
 
           }
         }catch(err){
             throw err;
         }
 
     }

    function handleEdit (employee:any)  {
        setSelectedEmployee(employee);  
        setView('edit');
    }

    function handleClick (e:any)  {
        setView('view'); 
    }

    function handleAdd (e:any)  {
        setView('add');
    }

    
    return(
       <div className="flex-col">
                <div className="border p-4 mb-4 flex justify-between">
                    <Link href='/admin' className="bg-blue-500 text-white px-4 py-2 rounded">Back</Link>
                    <button onClick={handleAdd}className="bg-green-500 text-white px-4 py-2 rounded">Add New</button>
                </div>
               
                <div className="h-full">
                    <DataGrid rows={rows} columns={columns} />
                </div>
            </div>
    )
}