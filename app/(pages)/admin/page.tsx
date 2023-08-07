import Link from "next/link"

import Header from "../_components/header"
  
export default async function Admin() {
  
    return (
        <div className="p-2 md:p-6 bg-cover bg-center h-screen" style={{ backgroundImage: "url('/vecteezy.jpg')"}}>
            <Header />
            <div className="flex flex-col space-y-2 md:space-y-3 pt-6 md:pt-20">
                <Link href="/admin/departments" className="bg-gray-300/90 border-2 border-green-700  md:text-2xl p-4 rounded-md w-36 md:w-72">Department Manager</Link> 
                <Link href="/admin/employees" className="bg-gray-300/90 border-2 border-green-700  md:text-2xl p-4 rounded-md w-36 md:w-72">Employee Manager</Link>
                <Link href="/admin/timecards" className="bg-gray-300/90 border-2 border-green-700  md:text-2xl p-4 rounded-md w-36 md:w-72">Timecard Manager</Link>        
            </div>
        </div>
    )
}

