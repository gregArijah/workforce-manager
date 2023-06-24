    'use client';

    import { useState } from 'react';

    export default function Searchbar(): JSX.Element {
    const testApi = async () => {
        const res = await fetch(`/api/company?id=${searchVal}`, { // Pass searchVal as a parameter in the URL
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        });

        const json = await res.json();
        console.log('Company Name:', json.name); // Access the company name property
        console.log('Company Code:', json.code); // Access the company code property
    };

    const [searchVal, setSearchVal] = useState('');

    const search = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(searchVal || 'no value');
        testApi();
        setSearchVal('');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchVal(e.target.value);
    };

    return (
        <div className="searchbar">
        <p>Test the api: search db for company 'clj3c6bq80000v25004a9pzfn'</p>
        <div className="searchbar__container">
            <form className="searchbar__container__input" onSubmit={search}>
            <input
                name="search"
                type="text"
                placeholder="Search"
                value={searchVal}
                onChange={handleInputChange}
            />
            <button type="submit">Go</button>
            </form>
        </div>
        </div>
    );
    }
