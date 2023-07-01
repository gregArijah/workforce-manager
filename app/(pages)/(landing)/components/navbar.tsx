'use client';

import Link from "next/link";


export default function Navbar() {
 
  function loginAlert() {
    return alert(`a login form will appear here`)
  }

  function contactAlert() {
    return alert(`a contact form will appear here, or maybe a links to our linkedin profiles`)
  }


  return (
      <nav className='text-right'>
        <p>Navbar goes here: options for <span className='cursor-pointer text-red-700' onClick={loginAlert} >&quot;login&quot;</span> form and <span className='cursor-pointer text-red-700' onClick={contactAlert}>&quot;contact&quot;</span> form</p>
        <p>after successful login, <Link href="/punches" className='text-red-700'>this link</Link> should automatically be followed</p>
      </nav>
    )
}