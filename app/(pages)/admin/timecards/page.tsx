'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import Header from "@components/header";
import { FaEye } from "react-icons/fa";
import SelectPeriod from "./_components/selectPeriod";
import Main from "./_components/main";
import View from "./_components/view";
import Add from "./_components/add";

export default function TimeCards() {
  const [timecards, setTimecards] = useState<{ id: string, department:any, name: string; code: string, timeCards:any}[]>([]); // Explicitly specify the type
  const [fromDate, setFromDate] = useState(''); // Explicitly specify the type
  const [toDate, setToDate] = useState(''); // Explicitly specify the type
  const [view, setView]  = useState('main'); // Explicitly specify the type
  const [card,setCard] = useState(''); // Explicitly specify the type

  return (
    <div className="h-screen">
      <Header />
      {view== 'main' && <SelectPeriod setFromDate={setFromDate} setToDate={setToDate} fromDate={fromDate} toDate={toDate} setTimeCards={setTimecards}/>}
      {view==='main' && <Main timecards={timecards} setView={setView} setCard={setCard} />}
      {view==='view' && <View setView={setView} card={card} setCard={setCard} />}

      {view==='add'  && <Add setView={setView} card={card} setCard={setCard} setTimecards={setTimecards} fromDate={fromDate} toDate={toDate}  />}

    
    </div>
  );
}


