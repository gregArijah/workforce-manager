import { time } from "console";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

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

    const columns: GridColDef[] = [
        { field: 'Name', headerName: 'Name', width: 200 },
        { field: 'Code', headerName: 'Code', width: 150 },
        { field: 'Department', headerName: 'Department', width: 150 },
        { field: 'Total Hours', headerName: 'Total Hours', width: 150,
        renderCell: (cellValues) => {
            const res = sumHours(cellValues.row.Timecards);
            return (res)
        } },
        { field: 'Clocked In', headerName: 'Clocked In', width: 150 },
        { field: 'Actions', headerName: 'Actions', width: 150, 
        renderCell: (cellValues) => {
            const timecard = cellValues.row;
            console.log("timecard", timecard);
            return (
                <div className="space-x-1">
                    <button onClick={()=>handleView(timecard)} className="bg-blue-500 text-white p-1.5  rounded">
                        <FaEye />
                    </button>                 
                </div>
            );
          } },
      ]
    
    const rows: GridRowsProp = timecards.map((timecard:any) => (
        { 
            id: timecard.id, 
            Name: timecard.name, 
            Code: timecard.code, 
            Department: timecard.department.code,
            "Clocked In": timecard.isClockedIn ? "Yes" : "No",	
            Timecards: timecard.timeCards,
        }
    ));
   
    if (!timecards || timecards.length === 0) {
        return <p>Select a date range to view timecards</p>;
      }

    function handleView (timecard:any)  {
        setView('view');
        setCard(timecard);
     }

return (

    <div className="flex-col">
        

    <div className="border p-4">
    <h2>Employee Hours</h2>
    {/* <table className="w-full">
        <thead>
        <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Code</th>
            <th className="px-4 py-2">Department</th>
            <th className="px-4 py-2">Total Hours</th>
            <th className="px-4 py-2">Clocked In</th>          
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
            <td className="px-4 py-2">{timecard.isClockedIn ? "Yes" : "No"}</td>
            
            <td className="px-4 py-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded" 
                        onClick={()=>handleView(timecard)}>
                    <FaEye />
                </button>    
            </td>
            </tr>
        ))}
        </tbody>
    </table> */}
  
    </div>
        <div className="h-full">
            <DataGrid rows={rows} columns={columns} />
        </div>
    </div>
)
}