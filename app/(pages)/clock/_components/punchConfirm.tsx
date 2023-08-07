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
                <div className="text-4xl">
                    <p>Hello {name},</p>
                    <p>You are now clocked in.</p>
                    <br/>
                    <p>The time is: {date}</p>
                    <br/>
                </div>
            }
            {punchChoice == 'out' &&
                <div className="text-4xl">
                    <p>You are now clocked out.</p>
                    <p>The time is: {date}</p>
                    <br/>
                    <p>Goodbye {name}</p>
                    <br/>
                </div>
            }
            <button type="button" onClick={() => setVisibleComponent('punchSelect')} className="bg-gray-300/90 border-2 border-green-700  md:text-4xl p-4 rounded-md w-24 md:w-60">OK</button>
        </div>
    )
}