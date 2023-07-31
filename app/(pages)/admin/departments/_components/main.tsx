interface MainProps {
    departments: { name: string; code: string }[];
    setView: (view: any) => void;
    }

export default function Main({ departments, setView }: MainProps){

    function handleAdd(view:String){
        setView(view);
    }

    return (
        
        <div>
            
        <div className="border p-4 mb-4">
          <button onClick={()=>handleAdd('add')} className="bg-green-500 text-white px-4 py-2 rounded">Add New</button>
        </div>
        {/* Render each department item */}
        {departments.map((department, index) => (
          <div key={index} className="border p-4 flex space-x-3">
            <h2 className="font-bold">{department.name}</h2>
            <h3 className="text-gray-500">{department.code}</h3>

            <div className="flex mt-2">
              <button className="mr-2 bg-blue-500 text-white px-4 py-2 rounded">
                View
              </button>
              <button className="mr-2 bg-green-500 text-white px-4 py-2 rounded">
                Edit
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
        </div>
    )
}