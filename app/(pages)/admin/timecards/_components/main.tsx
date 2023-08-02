import { time } from "console";
import Link from "next/link";
import { FaEye } from "react-icons/fa";

function sumHours(timecard:any){
    let totalHours = 0;
    for (const line of timecard) {
        totalHours += line.duration;
      }
    return totalHours.toFixed(2);
    }
 
interface mainProps {
    setView: (view: any) => void;
    setCard: (code: any) => void;
    timecards: any;
    }

export default function main({ timecards, setView, setCard}: mainProps) {
    //timecards = timecards.timecards;
    console.log(timecards);
    if (timecards.length === 0) {
        return <p>Select a date range to view timecards</p>;
      }

    function handleClick (timecard:any)  {
        setView('view');
        setCard(timecard);
     }

return (

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
        {timecards.map((timecard:any) => (
            <tr key={timecard.id}>
            <td className="px-4 py-2">{timecard.name}</td>
            <td className="px-4 py-2">{timecard.code}</td>
            <td className="px-4 py-2">{timecard.department.code}</td>
            <td className="px-4 py-2">{sumHours(timecard.timeCards)}</td>
            <td className="px-4 py-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded" 
                        onClick={()=>handleClick(timecard)}>
                    <FaEye />
                </button>    
            </td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>
    </div>
)
}