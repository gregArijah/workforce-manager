import React, { useState } from "react";


export default function SelectPeriod() {

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");


    const handleView = () => {
        // Perform the desired action when the "View" button is clicked
        console.log('View button clicked!');
        // Add your logic here to handle the view action
      };
      
      const handleFromDateChange = (e:any) => {
        setFromDate(e.target.value);
      };

      const handleToDateChange = (e:any) => {
        setToDate(e.target.value);
      };
    return(  
        <div className="border p-4">
        <h2 className="mb-2">Select Period</h2>
        <div className="flex space-x-4">
            <div className="flex flex-col">
                <label htmlFor="fromDate" className="mb-2">
                From:
                </label>
                <input
                type="date"
                id="fromDate"
                value={fromDate}
                onChange={handleFromDateChange}
                className="px-2 py-1 rounded border"
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="toDate" className="mb-2">
                To:
                </label>
                <input
                type="date"
                id="toDate"
                value={toDate}
                onChange={handleToDateChange}
                className="px-2 py-1 rounded border"
                />
            </div>
            <button onClick={handleView} className="px-4 py-2 bg-blue-500 text-white rounded">
                View
            </button>
        </div>

        </div>

    )};