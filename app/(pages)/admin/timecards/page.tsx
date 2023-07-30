'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import Header from "@components/header";
import { FaEye } from "react-icons/fa";
import SelectPeriod from "./_components/selectPeriod";
import ShowAll from "./_components/showAll";

export default function TimeCards() {
  const [timecards, setTimecards] = useState<{ id: string, department:any, name: string; code: string, timeCards:any}[]>([]); // Explicitly specify the type
  const [fromDate, setFromDate] = useState(''); // Explicitly specify the type
  const [toDate, setToDate] = useState(''); // Explicitly specify the type
 
  return (
    <div className="h-screen">
      <Header />
      <SelectPeriod setFromDate={setFromDate} setToDate={setToDate} fromDate={fromDate} toDate={toDate} setTimeCards={setTimecards}/>
      <ShowAll timecards={timecards} />
 
    </div>
  );
}


