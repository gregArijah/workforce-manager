'use client'

import Header from "../components/header"
import Navbar from "./components/navbar"
import PunchSelect from "./components/punchSelect"
import PunchId from "./components/punchId"
import PunchConfirm from "./components/punchConfirm"


import { useState } from "react"

export default function Punches(): JSX.Element {
    const [punchChoice, setPunchChoice] = useState('in')
    const [visibleComponent, setVisibleComponent] = useState('punchSelect') 

 
    return (  
      <div className='h-screen space-y-16 p-6'> 
        <Navbar />
        <Header />
        
        {visibleComponent=="punchSelect"&&
            <PunchSelect
                setPunchChoice={setPunchChoice}
                setVisibleComponent={setVisibleComponent} 
        />}
        {visibleComponent=="punchId"&&
            <PunchId 
                setVisibleComponent={setVisibleComponent}
        />}
        {visibleComponent=="punchConfirm"&&
            <PunchConfirm 
                punchChoice={punchChoice}
                setVisibleComponent={setVisibleComponent}
        />}    
    </div>
        )
}

    