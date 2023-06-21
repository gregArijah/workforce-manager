'use client';

import { useState } from 'react';

export default function Searchbar() {

    //test api will call function from app\api\company\route.tsx
    //
    const testApi = async () => {
        const res = await fetch('/api/company', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                },
              
                }
            );
        const json = await res.json();
        console.log(json);
        console.log("hello");
    }
    
    const [searchVal,setSearchVal] = useState('');

    const search = (e:any) => {
        e.preventDefault();
        console.log(searchVal || "no value");
        testApi();
        setSearchVal(''); // reset search va
     }

    const handleInputChange = (e:any) => {
        setSearchVal(e.target.value);
    }

return (
    <div className="searchbar">
        <text>Test the api: search db for company '001'</text>
        <div className="searchbar__container">
            <div className="searchbar__container__input">
                <input 
                    name="search" 
                    type="text" 
                    placeholder="Search"
                    value={searchVal}
                    onChange={handleInputChange} />
                <button type="submit" onClick={search}>go</button>
            </div>
        </div>
    </div>
);

}