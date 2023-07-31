interface DeptProps {
    setView: (view: any) => void;
    setDepartments: (dept: any) => void;
    departments: any;
    }

export default function ViewDept ({setView, setDepartments, departments}: DeptProps ){
    return (
        <div>
              <div className="border p-4 mb-4">
          <button onClick={()=>setView('main')} className="bg-blue-500 text-white px-4 py-2 rounded">Back</button>
        </div>
            <h1> View Department Page</h1>
            <button className="mr-2 bg-green-500 text-white px-4 py-2 rounded">
                Edit
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded">
                Delete
              </button>
            <p>Dept name , code, #of employees</p>
            <p>list of employees, employeecode</p>
            <p></p>
        </div>
    )

}