'use client';

import Link from "next/link";


export default function Navbar() {
 
  function adminLoginAlert(): void {
    alert(`admin login form will appear here`)
}


  return (
      <nav className='text-right'>
            Navbar goes here: options for <span className='cursor-pointer text-red-700' onClick={adminLoginAlert} >&quot;adminLogin&quot;</span> form    
      </nav>
    )
}