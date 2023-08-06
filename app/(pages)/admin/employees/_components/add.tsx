import { useState, useEffect } from 'react';

const getDepartments = async () => {
    const api = `/api/department/`;
    const res = await fetch(api, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await res.json();

    
    return json;
  };

  
const api = `/api/employee`;

const getEmployees = async () => {
    const res = await fetch(api, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await res.json();
    return json;
  };

const addEmployee = async (employee:any) => {
  
  
    const res = await fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });
 
    const json = await res.json();
    return json;
  };

interface EmployeeProps {
    setView: (view: any) => void;
    setEmployees: (dept: any) => void;
    employees: any;
    }

export default function Add ({setView, setEmployees, employees}: EmployeeProps ){
    
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [dept, setDept] = useState('');
    const [deptlist, setDeptList] = useState([]); // Explicitly specify the type
    

    useEffect(() => {
        const fetchData = async () => {
            const data = await getDepartments();
            setDeptList(data);
        };
        fetchData();
    }, []);
   
  
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCode(event.target.value);
    };

    const handleDeptChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDept(event.target.value);
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();        

        // Do any additional validation if required
        if (!name || ! code || !dept) {
            alert('Please fill in all fields.');
            return;
        }

        // Create the department object using the form data
        const newEmployee = {
            name,
            code,
            departmentId: dept,
        };
        await addEmployee(newEmployee);
        alert('Employee added successfully');
        // Update the state with the new department
        setEmployees(await getEmployees());

        // Optionally, you can reset the form after submission
        setName('');
        setCode('');
        setDept('');
    };

    return (
        <div>
              <div className="border p-4 mb-4">
          <button onClick={()=>setView('main')} className="bg-blue-500 text-white px-4 py-2 rounded">Back</button>
        </div>
            <h1 className="font-bold pb-2"> Add a new Employee</h1>
        
            <div>
                <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input 
                            type="text" 
                            name="name" 
                            value={name} 
                            onChange={handleNameChange} 
                        />
                    </label>

                    <label>
                        Code:
                        <input 
                            type="text" 
                            name="code" 
                            value={code} 
                            onChange={handleCodeChange} 
                        />
                    </label>
                {/* next  field should be a drop down list using the name fiel from dept */}
                    <label>
                        Department:
                        <select 
                            name="dept" 
                            onChange={handleDeptChange}>
                            
                            <option value="">Select a department</option>
                            {deptlist.map((dept:any) => (
                                <option key={dept.id} value={dept.id}>
                                    {dept.name}
                                </option>
                            ))}
                        </select>
                    </label>
                 

                    <button type="submit" className="bg-blue-300 p-4 rounded w-24">submit</button>
                </form>
            </div>
        </div>
    )

}