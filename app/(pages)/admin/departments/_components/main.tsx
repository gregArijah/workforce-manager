import Link from "next/link";



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
    setView: (view: any) => void;
    }

export default function Main({ departments, setView }: MainProps){
    function handleEdit(){
        setView('edit');
    }

    async function handleDelete(department:any){
       // setView('delete');
       console.log(department);
       const isConfirm:Boolean = confirm("Are you sure you want to delete this department?");
       try{
          console.log(isConfirm);
          if (isConfirm){
              await deleteDepartment(department.id);
              console.log("deleted");
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

            <div className="flex mt-2">
                <button onClick={()=>handleEdit()} className="mr-2 bg-green-500 text-white px-4 py-2 rounded">
                    Edit
                  </button>
                  <button onClick={()=>handleDelete(department)} className="bg-red-500 text-white px-4 py-2 rounded">
                    Delete
                  </button>
                  {/* <button onClick={handleView}className="mr-2 bg-blue-500 text-white px-4 py-2 rounded">
                    View
                  </button> */}
                  
            </div>
          </div>
        ))}
        </div>
    )
}