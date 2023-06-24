'use client';
const api = '/api/company';	

    //get list will be a function that will call the api to list all companies
    const getlist = async() => {
        console.log("get list of all companies");
        const res = await fetch( api, { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const json = await res.json();
        console.log(json);
        return json;
    };



export default function Listall(): JSX.Element {
    
    return (
        <div className="listall">
            <p>test api: press this button to list all companies</p>
            <button onClick={getlist} className="bg-green-300 p-4 rounded" >List All</button>
            {/* //this is the contanier where the results will be listed are being retiwived from db */}
            



        </div>

    );
}