'use client'

import { error } from "console";
import { useState } from "react";

interface PunchIdProps {
    setVisibleComponent: (component: string) => void;
    punchChoice: string;
    setWhoIs: (whoIs: object) => void;
};

export default function PunchId( {setVisibleComponent, punchChoice, setWhoIs}: PunchIdProps) {
    

    const [badge, setBadge] = useState<string>('')
    
    function handleCancel() {
        setVisibleComponent('punchSelect')
    }
    
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (badge) clockInAndOut(badge, punchChoice);  
        }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBadge(e.target.value);
    };

    

    const clockInAndOut = async (badge: String, punchChoice: String) => {
        const employeeApi = `/api/employee?code=${badge}`
        const timeCardApi = '/api/timecard';
        //check employee status, if clocked in or out
        const getEmployees = await fetch(employeeApi, {
            method: 'GET',
            headers:{
                'Content-Type': 'application-json', 
            },
        });
        const employee = await getEmployees.json();
        setWhoIs(employee);
        if(employee.isClockedIn && punchChoice === 'in') {
            alert('already clocked in');
            return;
        }
        if(!employee.isClockedIn && punchChoice === 'out') {
            alert('already clocked out');
            return;
        }

        //clock in  
        if(punchChoice === 'in') {
            
            try{  
                const clockIn = await fetch(timeCardApi, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        employeeId: employee.id,
                        timeIn: new Date(),
                        timeOut: null 
                    }),
                });
                const json = await clockIn.json();
                setVisibleComponent('punchConfirm') 
            }catch(error) {
                console.error(error);//return new Response("error", {status: 500 })
            }   //fex error here, returning "unexpected end of json input"
        }
        //clock out
        if(punchChoice === 'out') {
            try{  
                const clockOut = await fetch(`${timeCardApi}?employeeId=${employee.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        timeOut: new Date(),
                    }),
                });
                const json = await clockOut.json();
                setVisibleComponent('punchConfirm') 
            }catch(err) {
                return new Response("error", {status: 500 })
            }
        }
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>enter badge/id</label>
                    <input type="text" 
                           name="badge"
                           value={badge}
                           onChange={handleInputChange}      
                    />
                </div>
                <div className="space-x-2 mb-16">
                    <button type="button" onClick={handleCancel} className="bg-red-300 p-4 rounded w-24">cancel</button> 
                    <button type="submit"  className="bg-green-300 p-4 rounded w-24">submit</button>
                </div> 
            </form>
        </div>
    )
}
