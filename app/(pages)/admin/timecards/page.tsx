'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import Header from "@components/header";
import { FaEye } from "react-icons/fa";
import SelectPeriod from "./_components/selectPeriod";
import { time } from "console";



const api = '/api/timecard';

const getTimecards = async () => {
  const res = await fetch(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await res.json();
  return json;
};

export default function TimeCards() {
  //const [timecards, setTimecards] = useState<{ id: string; name: string; code: string; department: any ; isClockedIn: boolean }[]>([]); // Explicitly specify the type
  const [timecards, setTimecards] = useState<{ id: string, department:any, name: string; code: string, timeCards:any}[]>([]); // Explicitly specify the type

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTimecards();
      setTimecards(data);
      console.log(data);
    };
    fetchData();
  }, []);

  function sumHours(timecard:any){
    let totalHours = 0;
    for (const line of timecard) {
        totalHours += line.duration;
        
        //console.log(timecard.duration)
      }
    console.log("total: ", totalHours)
    return totalHours.toFixed(3);
    }
 
  return (
    <div className="h-screen">
      <Header />
      <SelectPeriod />
      <div className="flex-col">
     

        <div className="border p-4">
          <h2>Employee Hours</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Code</th>
                <th className="px-4 py-2">Department</th>
                <th className="px-4 py-2">Total Hours</th>
                <th className="px-4 py-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {timecards.map((timecard) => (
                <tr key={timecard.id}>
                  <td className="px-4 py-2">{timecard.name}</td>
                  <td className="px-4 py-2">{timecard.code}</td>
                  <td className="px-4 py-2">{timecard.department.code}</td>
                  <td className="px-4 py-2">{sumHours(timecard.timeCards)}</td>
                  <td className="px-4 py-2">
                    <Link href={`/admin/timecards/${timecard.code}`}>
                      <button className="bg-blue-500 text-white px-2 py-1 rounded">
                        <FaEye />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// const api = '/api/timecard';

// const getTimecards = async () => {
//   const res = await fetch(api, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   const json = await res.json();
//   return json;
// };

// export default function TimeCards() {
//   //const [timecards, setTimecards] = useState<{ id: string; name: string; code: string; department: any ; isClockedIn: boolean }[]>([]); // Explicitly specify the type
//   const [timecards, setTimecards] = useState<{ id: string; employee:any, name: string; code: string}[]>([]); // Explicitly specify the type

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await getTimecards();
//       setTimecards(data);
//       console.log(data);
//     };
//     fetchData();
//   }, []);


 
//   return (
//     <div className="h-screen">
//       <Header />
//       <SelectPeriod />
//       <div className="flex-col">
     

//         <div className="border p-4">
//           <h2>Employee Hours</h2>
//           <table className="w-full">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2">Name</th>
//                 <th className="px-4 py-2">Code</th>
//                 <th className="px-4 py-2">Department</th>
//                 <th className="px-4 py-2">Total Hours</th>
//                 <th className="px-4 py-2">Details</th>
//               </tr>
//             </thead>
//             <tbody>
//               {timecards.map((timecard) => (
//                 <tr key={timecard.id}>
//                   <td className="px-4 py-2">{timecard.employee.name}</td>
//                   <td className="px-4 py-2">{timecard.employee.code}</td>
//                   <td className="px-4 py-2">{timecard.employee.department.code}</td>
//                   <td className="px-4 py-2">{}</td>
//                   <td className="px-4 py-2">
//                     <Link href={`/admin/timecards/${timecard.employee.code}`}>
//                       <button className="bg-blue-500 text-white px-2 py-1 rounded">
//                         <FaEye />
//                       </button>
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }
