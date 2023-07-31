interface DeptProps {
    setView: (view: any) => void;
    setDepartments: (dept: any) => void;
    departments: any;
    }

export default function AddDept ({setView, setDepartments, departments}: DeptProps ){
    return (
        <div>
            <h1> Add Department</h1>
        </div>
    )

}