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
        <div className="flex flex-col space-y-2 md:space-y-4">
            <button onClick={()=>punch('in')}  className="bg-gray-300/90 border-2 border-green-700  md:text-4xl p-4 rounded-md w-24 md:w-60" >In</button>
            <button onClick={()=>punch('out')}  className="bg-gray-300/90 border-2 border-red-600 md:text-4xl p-4 rounded-md w-24 md:w-60" >Out</button>
        </div>
    )

}