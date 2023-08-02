//on this page we want to display a form in order to add a new department
//the form shouls ask for the name and code of the department
//the form should have a submit button



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
            <h1 className="font-bold pb-2"> Add a new department</h1>
        
            <div>
                <form className="flex flex-col space-y-2">
                    <label>
                        Department Name:
                        <input type="text" name="name" />
                    </label>
                    <label>
                        Department Code :
                        <input type="text" name="code" />
                    </label>
                    <button type="submit"  className="bg-blue-300 p-4 rounded w-24">submit</button>
                </form>
            </div>
        </div>
    )

}