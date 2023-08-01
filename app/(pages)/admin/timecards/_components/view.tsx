import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
interface ViewProps {
    setView: (view: any) => void;
    setCard: (card: any) => void;
    card: any;
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





export default function View({ setView, card, setCard}: ViewProps) {

    function goBack(){
        setView('main');
    }
    
    return (
        <div>
            <div className="border p-4 mb-4">
                <button onClick={goBack} className="bg-blue-500 text-white px-4 py-2 rounded">Back</button>
            </div>
            <div className="flex-col">
                <h2 className="text-2xl font-bold mb-4">Details</h2>
                <h3 className="text-lg font-bold mb-2">Name: {card.name}</h3>
                <table className="w-full">
                <thead>
                    <tr>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Time In</th>
                    <th className="px-4 py-2">Time Out</th>
                    <th className="px-4 py-2">Total</th>
                    <th className="px-4 py-2">Details</th>
                    </tr>
                </thead>
                <tbody>
                    {card.timeCards.map((entry:any) => (
                    <tr key={entry.id}>
                        <td className="px-4 py-2">{readDate(entry.timeIn)}</td>
                        <td className="px-4 py-2">{readTime(entry.timeIn)}</td>
                        <td className="px-4 py-2">{readTime(entry.timeOut)}</td>
                        <td className="px-4 py-2">{entry.duration}</td>
                        <td><button className="bg-green-500 text-white px-2 py-1 rounded">
                            <FaEdit />
                        </button>
                        <button className="bg-red-500 text-white px-2 py-1 rounded">
                            <FaTrash />
                        </button></td>
                    </tr>
                    ))}
                </tbody>
                </table>
                <div className="mt-4">
                <strong>Total Hours: {sumHours(card.timeCards)} </strong>
                </div>
            </div>
                    
        </div>

    )

}