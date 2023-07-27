'use client'

interface PunchConfirmProps {
    punchChoice: string;
    setVisibleComponent: (component: string) => void;
    whoIs: any;
}

export default function PunchConfirm( {punchChoice, setVisibleComponent, whoIs}: PunchConfirmProps){

    //const name = whoIs.name.trim().split(' ')[0] ;
    const name = whoIs.name;
    const date = new Date().toLocaleTimeString("en-GB");

    return( 
        <div>
            {punchChoice == 'in' &&
                <div>
                    <p>Hello {name}, You are now punched in</p>
                    <p>your punch in time is: {date}</p>
                </div>
            }
            {punchChoice == 'out' &&
                <div>
                    <p>You are now punched out</p>
                    <p>your punch out time is: {date}</p>
                    <p>Goodbye {name}</p>
                </div>
            }
            <button type="button" onClick={() => setVisibleComponent('punchSelect')} className="bg-green-300 p-4 rounded w-24">OK</button>
        </div>
    )
}