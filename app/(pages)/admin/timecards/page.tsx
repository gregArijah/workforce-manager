'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import Header from "@components/header";
import { FaEye } from "react-icons/fa";
import SelectPeriod from "./_components/selectPeriod";
import ShowAll from "./_components/showAll";
import ShowOne from "./_components/showOne";

export default function TimeCards() {
  const [timecards, setTimecards] = useState<{ id: string, department:any, name: string; code: string, timeCards:any}[]>([]); // Explicitly specify the type
  const [fromDate, setFromDate] = useState(''); // Explicitly specify the type
  const [toDate, setToDate] = useState(''); // Explicitly specify the type
  const [view, setView]  = useState('all'); // Explicitly specify the type
  const [card,setCard] = useState(''); // Explicitly specify the type
  
  console.log(view)
  console.log(card)
  return (
    <div className="h-screen">
      <Header />
      <SelectPeriod setFromDate={setFromDate} setToDate={setToDate} fromDate={fromDate} toDate={toDate} setTimeCards={setTimecards}/>
      
      {view==='all' && <ShowAll timecards={timecards} setView={setView} setCard={setCard} />}
      {view==='one' && <ShowOne setView={setView} card={card} setCard={setCard} />}
 
    
    </div>
  );
}


