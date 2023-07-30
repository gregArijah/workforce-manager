import React, { useState } from "react";

interface SelectPeriodProps {
  setFromDate: (date: any) => void;
  setToDate: (date: any) => void;
  toDate: any;
  fromDate: any;
  setTimeCards: (timecards: any) => void;
}


export default function SelectPeriod({setFromDate,setToDate, fromDate, toDate, setTimeCards}:SelectPeriodProps) {

    // const [fromDate, setFromDate] = useState("");
    // const [toDate, setToDate] = useState("");
    //let toDate: any,fromDate : any;


    const handleView = (e:any) => {
      const api = '/api/timecard';

      const getTimecards = async (fromDate:any, toDate:any) => {
        const res = await fetch(`${api}?fromDate=${fromDate}&toDate=${toDate}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const json = await res.json();
        setTimeCards(json);
        return json;
      };
      getTimecards(fromDate,toDate);
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