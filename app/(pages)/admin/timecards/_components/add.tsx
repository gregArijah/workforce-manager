import { useState, useEffect } from 'react';

    const api = `/api/timecard`;

 
  const addTimecard = async (timecard:any) => {
   const api = `/api/timecard`;
    const res = await fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(timecard),
        });
        const json = await res.json();
        return json;
  }

  const getTimecards = async (fromDate:any, toDate:any, employeeId:any) => {
    
    const isoToDate = new Date(toDate);
    const isoFromDate = new Date(fromDate);
    const api = `/api/timecard`;
    
    const res = await fetch(`${api}?employeeId=${employeeId}&fromDate=${isoFromDate}&toDate=${isoToDate}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await res.json();
    return json;


}


    

const getAllTimecards = async (fromDate:any, toDate:any) => {
    const isoToDate = new Date(toDate);
    const isoFromDate = new Date(fromDate);
    const offset = isoFromDate.getTimezoneOffset()	;
    
    const res = await fetch(`${api}?fromDate=${isoFromDate}&toDate=${isoToDate}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    });
    const json = await res.json();
    //setTimeCards(json);
    return json;

}

 
interface TimecardProps {
    setView: (view: any) => void; 
    card: any;
    setCard: (card: any) => void;
    setTimecards: (timecards: any) => void;
    fromDate: any;
    toDate: any;
    }

export default function Add ({setView, card, setCard, setTimecards, fromDate, toDate}: TimecardProps ){
    
    const [name, setName] = useState(card.Name);
    const [timeIn, setTimeIn] = useState('');
    const [timeOut, setTimeOut] = useState('');
    const [duration, setDuration] = useState<number>(0);

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
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        if (timeIn == "") {
            alert("Please select a time in");
            return;
        }

        //Create the entry using the form data
        const newEntry = {
            employeeId:card.id,
            timeIn: new Date(timeIn),
            timeOut: timeOut==""? null : new Date(timeOut),
            duration : duration==0? null : duration,
        };

        await addTimecard(newEntry);
        const newCard = await getTimecards(fromDate, toDate, card.id);
        setCard ({
            ...card,
            newCard,
            Timecards: newCard.Timecards?  newCard.Timecards: newCard.timeCards 
           }) 
        //setCard(await refreshTimecards);
   

        setTimecards(await getAllTimecards(fromDate,toDate));

        alert('Timecard entry successful');
    //  Update the state with the new department
    //  setTimecards(await getTimecards());

        // Optionally, you can reset the form after submission
        
        setTimeIn('');
        setTimeOut('');
        setDuration(0); 
        setView('view');
        
        return;
    };

    return (
        <div>
              <div className="border p-4 mb-4">
          <button onClick={()=>setView('view')} className="bg-blue-500 text-white px-4 py-2 rounded">Back</button>
          
        </div>
            <h1 className="font-bold pb-2"> Add a timecard entry</h1>
        
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