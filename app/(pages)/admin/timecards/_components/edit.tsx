import { useState } from "react";

async function updateTimecard(updatedEntry:any){
    const {id} = updatedEntry;
    const api = '/api/timecard';
    const res = await fetch(`${api}?timecardId=${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEntry),
    });
    const json = await res.json();
    return json;



}

async function getCard(id:string){
    
    const api = `/api/timecard?employeeId=${id}`;
    const res = await fetch(api, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const json = await res.json();
    return json;

}

interface EditProps {
    setView: (view:string) => void;
    card: any;
    setCard: (card:any) => void;
    editEntry: any;
    setEditEntry: (editEntry:any) => void;
}

export default function Edit({setView, setCard, card, editEntry, setEditEntry}:EditProps) {

    
    let time1 = new Date(editEntry.timeIn);
    let time2 = (editEntry.timeOut)? new Date(editEntry.timeOut) : null;
    
    const timezoneOffset = time1.getTimezoneOffset();
    time1.setMinutes(time1.getMinutes() - timezoneOffset);
    time2?.setMinutes(time2.getMinutes() - timezoneOffset)
    
    const [name, setName] = useState(card.Name);
    const [timeIn, setTimeIn] = useState(time1.toISOString().slice(0, 16));
    const [timeOut, setTimeOut] = useState(time2?.toISOString().slice(0, 16)|| "");
    const [duration, setDuration] = useState(editEntry.duration || 0 );

    const handleTimeInChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTimeIn = new Date(event.target.value);
        if ((newTimeIn > new Date()) || (timeOut && newTimeIn > new Date(timeOut))) {
            alert("Invalid time selection....");
            return;
        }
        if (isNaN(newTimeIn.getTime())) {
            setDuration(0);
            setTimeIn('');
            return;
        }
        setTimeIn(event.target.value);
        if (timeOut){
            const dur = (new Date(timeOut).getTime() - newTimeIn.getTime()) / (1000 * 3600);
            setDuration(dur);
        }
        return;
        }
 
    const handleTimeOutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTimeOut = new Date(event.target.value);
        if ((newTimeOut > new Date()) || (timeIn && newTimeOut < new Date(timeIn))) {
            alert("Invalid time selection....");
            return;
        }
        if (isNaN(newTimeOut.getTime())) {
            setTimeOut('');
            setDuration(0);
            return;
        }
        setTimeOut(event.target.value);
        if (timeIn && newTimeOut){
            const dur = (newTimeOut.getTime() - new Date(timeIn).getTime()) / (1000 * 3600);
            setDuration(dur);
        }

        return;
    }

    async function handleSubmit(event:any) {    
        event.preventDefault();
        
        // Do any additional validation if required
        if (!timeIn) {
            alert('Time In is required');
            return;
        }
        
        const updatedEntry = {
            id: editEntry.id,
            timeIn: new Date(timeIn).toISOString(),
            timeOut: timeOut? new Date(timeOut).toISOString() : null,
            duration: duration? duration : null,
        }

        await updateTimecard(updatedEntry);

        const newCard = {
            ...card,
            Timecards: card.Timecards.map((tc:any) => {
                if (tc.id === updatedEntry.id){
                    return updatedEntry;
                }
                return tc;
            }),
        }

       

        alert("Entry updated successfully");
        setCard(newCard);
        setView('view');
        return;
    }

    return (
        <div>
              <div className="border p-4 mb-4">
          <button onClick={()=>setView('view')} className="bg-blue-500 text-white px-4 py-2 rounded">Back</button>
          
        </div>
            <h1 className="font-bold pb-2"> Edit timecard entry</h1>
        
            <div>
                <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
                    <label>
                        Name :
                        <input 
                            type="text"
                            name="name" 
                            defaultValue={name}  
                            className="bg-gray-100 text-gray-600 border-gray-300 cursor-not-allowed"
                            disabled={true}
                            

                        />
                    </label>
                    <label> 
                        Time In:
                        <input 
                            type="datetime-local" 
                            name="timeIn" 
                            value={timeIn} 
                            onChange={handleTimeInChange}
                         
                        />
                    </label>

                    <label>
                        Time Out:
                        <input 
                            type="datetime-local" 
                            name="timeIn" 
                            value={timeOut} 
                            onChange={handleTimeOutChange} 
                        />
                    </label> 
                    
                    <label>
                        Duration:
                        <input 
                            type="text" 
                            name="duration" 
                            value={duration? (duration.toFixed(2) + (duration == 1? " hour" : " hours")): 0} 
                            onChange={()=>{return}} 
                            className="bg-gray-100 text-gray-600 border-gray-300 cursor-not-allowed"
                        />
                    </label>
                    
          
                 

                    <button type="submit" className="bg-blue-300 p-4 rounded w-24">submit</button>
                </form>
            </div>
        </div>
    )

}