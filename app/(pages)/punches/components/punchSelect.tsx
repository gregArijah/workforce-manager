'use client'

interface PunchSelectProps {
    setPunchChoice: (choice: string) => void;
    setVisibleComponent: (component: string) => void;
  }

export default function PunchSelect( {setPunchChoice, setVisibleComponent}: PunchSelectProps){

    

    function punch(status: string) {
        setPunchChoice(status); 
        setVisibleComponent('punchId');   
    }
   

    return (
        <div className="flex flex-col space-y-2">
            <button onClick={()=>punch('in')}  className="bg-green-300 p-4 rounded w-24" >In</button>
            <button onClick={()=>punch('out')}  className="bg-red-300 p-4 rounded w-24" >Out</button>
        </div>
    )

}