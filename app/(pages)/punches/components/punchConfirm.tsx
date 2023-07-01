'use client'

interface PunchConfirmProps {
    punchChoice: string;
    setVisibleComponent: (component: string) => void;
}

export default function PunchConfirm( {punchChoice, setVisibleComponent}: PunchConfirmProps){
    // a check for validpunch should go here. 
    //i.e. if clocked in employee tries to punch in again, they should get an error message
    //     if clocked out employee tries to punch out again, they should get an error message
    //     set valiudpunch to true or false
    //     then return to the punch select screen
    let validpunch: boolean = true;  //fixed to true for now but should be set by the program

    return( 
        <div>
            {!validpunch && punchChoice == 'in' &&
                <div>
                    <p>ERROR: You are already punched in</p>
                </div>
            }
            {!validpunch && punchChoice == 'out' &&
                <div>
                    <p>ERROR: You are already punched out</p>
                </div>
            }
            {validpunch && punchChoice == 'in' &&
                <div>
                    <p>Hello Johnny, You are now punched in</p>
                    <p>your punch in time is: 9:00am</p>
                </div>
            }
            {validpunch && punchChoice == 'out' &&
                <div>
                    <p>You are now punched out</p>
                    <p>your punch out time is: 5:00pm</p>
                    <p>Goodbye Johnny</p>
                </div>
            }
            <button type="button" onClick={() => setVisibleComponent('punchSelect')} className="bg-green-300 p-4 rounded w-24">OK</button>
        </div>
    )
}