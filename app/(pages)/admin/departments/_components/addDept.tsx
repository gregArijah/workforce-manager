interface DeptProps {
    setView: (view: any) => void;
    setDepartments: (dept: any) => void;
    departments: any;
    }

export default function AddDept ({setView, setDepartments, departments}: DeptProps ){
    return (
        <div>
              <div className="border p-4 mb-4">
          <button onClick={()=>setView('main')} className="bg-blue-500 text-white px-4 py-2 rounded">Back</button>
        </div>
            <h1> Add Department Page</h1>
            <p>some forms and stuff to add new department</p>
            <p>dept name, code, etc</p>
            <p>cancel or submit buttons</p>
        </div>
    )

}