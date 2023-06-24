'use client';



export default function Listall(): JSX.Element {

    //get list will be a function that will call the api to list all companies
    const getlist = async() => {
        console.log("get list of all companies");
        const res = await fetch(`/api/company`, { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const json = await res.json();
        return json;
    };

    return (
        <div className="listall">
            <p>test api: press this button to list all companies</p>
            <button onClick={getlist} className="bg-green-300 p-4 rounded" >List All</button>
            {/* //this is the contanier where the results will be listed are being retiwived from db */}
            



        </div>

    );
}