import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';


interface ViewProps {
    setView: (view: any) => void;
    setCard: (card: any) => void;
    card: any;
    setEditEntry: (entry: any) => void;
    }

function sumHours(timecard:any){
    let totalHours = 0;
    for (const line of timecard) {
        totalHours += line.duration;
        }
    return totalHours.toFixed(2);
    }

function readDate(date:any){
    const convDate = new Date(date);
    return convDate.toDateString();
}
function readTime(date:any){
    const convDate = new Date(date);
    return convDate.toLocaleTimeString("en-GB");
}

async function deleteTimecard(id:any){
    const api = '/api/timecard';
    const res = await fetch(`${api}?timecardId=${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const json = await res.json();
    return json;

}


export default function View({ setView, card, setCard, setEditEntry}: ViewProps) {

    const entries = card.Timecards;

    const columns: GridColDef[] = [
        { field: 'Date', headerName: 'Date', width: 200 },
        { field: 'Time In', headerName: 'Time In', width: 150 },
        { field: 'Time Out', headerName: 'Time Out', width: 150 },
        { field: 'Total Hours', headerName: 'Total Hours', width: 150},
        { field: 'Actions', headerName: 'Actions', width: 150,
        renderCell: (cellValues) => {
            const entry = cellValues.row;
            return (
                <div className="space-x-1">
                    <button onClick={()=>handleEdit(entry)} className="bg-blue-500 text-white px-2 py-1 rounded">
                        <FaEdit />
                    </button>
                    <button onClick={()=>handleDelete(entry)} className="bg-blue-500 text-white px-2 py-1 rounded">
                        <FaTrash />
                    </button>                 
                </div>
            );
          } },
      ]
    //   </thead>
    //   <tbody>
    //       {entries?.map((entry:any) => (
    //       <tr key={entry.id}>
    //           <td className="px-4 py-2">{readDate(entry.timeIn)}</td>
    //           <td className="px-4 py-2">{readTime(entry.timeIn)}</td>
    //           <td className="px-4 py-2">{entry.timeOut? readTime(entry.timeOut):null}</td>
    //           <td className="px-4 py-2">{entry.duration? (entry.duration).toFixed(2):0}</td>
    //           <td>
    //               <button onClick={()=>handleEdit(entry)} className="bg-green-500 text-white px-2 py-1 rounded">
    //                   <FaEdit />
    //               </button>
    //               <button onClick={()=>handleDelete(entry)} className="bg-red-500 text-white px-2 py-1 rounded">
    //                   <FaTrash />
    //               </button>  
    //           </td>
    //       </tr>
    //       ))}
    //   </tbody>
    const rows: GridRowsProp = entries.map((entry:any) => (
        { 
            id: entry.id, 
            Date: readDate(entry.timeIn),
            "Time In": readTime(entry.timeIn), 
            "Time Out": entry.timeOut? readTime(entry.timeOut):null,
            "Total Hours": entry.duration? (entry.duration).toFixed(2):0, 
            timeIn: entry.timeIn,
            timeOut: entry.timeOut,
            duration: entry.duration,

        }
    ));

    function goBack(){
        setView('main');
    }
    
    function handleAdd(){
        setView('add');
    }

    function handleEdit(entry:any){
        setEditEntry(entry);
        setView('edit');
    }

    async function handleDelete(entry:any){
        const isConfirm:Boolean = confirm("Are you sure you want to delete this record?");
        try{
           if (isConfirm){
                
               await deleteTimecard(entry.id);

               const newCard = {
                ...card,
                Timecards: card.Timecards.filter((tc:any) => tc.id !== entry.id),
               }    
               setCard(newCard);
      
            
               
           }
         }catch(err){
             console.log(err);
         }
 
    }

    return (
        <div>
            <div className="border p-4 mb-4 flex justify-between">
                <button onClick={goBack} className="bg-blue-500 text-white px-4 py-2 rounded">Back</button>
                <button onClick={handleAdd}className="bg-green-500 text-white px-4 py-2 rounded">Add New</button>

            </div>
            <div className="flex-col">
                <h2 className="text-2xl font-bold mb-4">Details</h2>
                <h3 className="text-lg font-bold mb-2">Name: {card.Name}</h3>
                
                <div className="mt-4">
                <strong>Total Hours: {sumHours(entries)} </strong>
                </div>
            </div>
            <div className="h-full">
                <DataGrid rows={rows} columns={columns} />
            </div>
                    
        </div>

    )

}


// <table className="w-full">
//                 <thead>
//                     <tr>
//                     <th className="px-4 py-2">Date</th>
//                     <th className="px-4 py-2">Time In</th>
//                     <th className="px-4 py-2">Time Out</th>
//                     <th className="px-4 py-2">Total</th>
//                     <th className="px-4 py-2">Details</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {entries?.map((entry:any) => (
//                     <tr key={entry.id}>
//                         <td className="px-4 py-2">{readDate(entry.timeIn)}</td>
//                         <td className="px-4 py-2">{readTime(entry.timeIn)}</td>
//                         <td className="px-4 py-2">{entry.timeOut? readTime(entry.timeOut):null}</td>
//                         <td className="px-4 py-2">{entry.duration? (entry.duration).toFixed(2):0}</td>
//                         <td>
//                             <button onClick={()=>handleEdit(entry)} className="bg-green-500 text-white px-2 py-1 rounded">
//                                 <FaEdit />
//                             </button>
//                             <button onClick={()=>handleDelete(entry)} className="bg-red-500 text-white px-2 py-1 rounded">
//                                 <FaTrash />
//                             </button>  
//                         </td>
//                     </tr>
//                     ))}
//                 </tbody>
//                 </table>