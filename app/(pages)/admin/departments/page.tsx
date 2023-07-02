import Header from "../../_components/header";

export default function Departments() {
  // Assuming you have an array of department objects coming from the database
  const departments = [
    { name: "Department 1", code: "D001" },
    { name: "Department 2", code: "D002" },
    { name: "Department 3", code: "D003" },
    // ...
  ];

  return (
    <div className="h-screen">
      <Header />

      <div className="flex-col">
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
      change those buttons to icons, bcuz its 2023</div>
    </div>
  );
}
