import { useState } from 'react';

interface DeptProps {
    setView: (view: any) => void;
    setDepartments: (dept: any) => void;
    departments: any;
}

export default function EditDept({ setView, setDepartments, departments }: DeptProps, department: any) {
    const [name, setName] = useState(department.name);
    const [code, setCode] = useState('');

    console.log(department);
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCode(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Do any additional validation if required
        if (!name || !code) {
            console.log('Please fill in all fields.');
            return;
        }

        // Create the department object using the form data
        const newDepartment = {
            name,
            code,
        };

        // Update the state with the new department
        setDepartments([...departments, newDepartment]);

        // Optionally, you can reset the form after submission
        setName('');
        setCode('');
    };

    return (
        <div>
            <div className="border p-4 mb-4">
                <button onClick={() => setView('main')} className="bg-blue-500 text-white px-4 py-2 rounded">Back</button>
            </div>
            <h1 className="font-bold pb-2">Edit department</h1>

            <div>
                <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
                    <label>
                        Department Name:
                        <input type="text" name="name" value={name} onChange={handleNameChange} />
                    </label>
                    <label>
                        Department Code:
                        <input type="text" name="code" value={code} onChange={handleCodeChange} />
                    </label>
                    <button type="submit" className="bg-blue-300 p-4 rounded w-24">submit</button>
                </form>
            </div>
        </div>
    );
}

// interface DeptProps {
//     setView: (view: any) => void;
//     setDepartments: (dept: any) => void;
//     departments: any;
//     }

// export default function EditDept ({setView, setDepartments, departments}: DeptProps ){
//     return (
//         <div>
//               <div className="border p-4 mb-4">
//           <button onClick={()=>setView('main')} className="bg-blue-500 text-white px-4 py-2 rounded">Back</button>
//         </div>
//             <h1 className="font-bold pb-2"> Edit department</h1>
        
//             <div>
//                 <form className="flex flex-col space-y-2">
//                     <label>
//                         Department Name:
//                         <input type="text" name="name"/>
//                     </label>
//                     <label>
//                         Department Code :
//                         <input type="text" name="code" />
//                     </label>
//                     <button type="submit"  className="bg-blue-300 p-4 rounded w-24">submit</button>
//                 </form>
//             </div>
//         </div>
//     )

// }