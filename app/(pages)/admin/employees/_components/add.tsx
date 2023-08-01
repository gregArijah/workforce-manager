interface EmployeeProps {
    setView: (view: any) => void;
    setEmployees: (dept: any) => void;
    employees: any;
    }

export default function Add ({setView, setEmployees, employees}: EmployeeProps ){
    return (
        <div>
              <div className="border p-4 mb-4">
          <button onClick={()=>setView('main')} className="bg-blue-500 text-white px-4 py-2 rounded">Back</button>
        </div>
            <h1> Add Employee Page</h1>
            <p>some forms and stuff to add new employee</p>
            <p> name, code, etc</p>
            <p>cancel or submit buttons</p>
        </div>
    )

}