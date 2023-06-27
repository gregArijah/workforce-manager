'use client';


export default async function Home() {
 
  function loginAlert() {
    return alert(`a login form will appear here`)
  }

  function contactAlert() {
    return alert(`a contact form will appear here`)
  }


  return (
    <div className='h-screen'> 
      <nav className='text-right'>Navbar goes here: options for <span className='cursor-pointer text-red-700' onClick={loginAlert} >&quot;login&quot;</span> form and <span className='cursor-pointer text-red-700' onClick={contactAlert}>&quot;contact&quot;</span> form</nav>
      <br />
      <header className='text-left'>Header goes here: logo, name, and slogan</header>

        <p className="flex w-full justify-left border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl">
          NANJI - WORKFORCE MANAGER
        </p>  
        <div className = "flex justify-center items-center pt-32">
          Cool background image goes here, and maybe some info in sliders?( about, feautues, devs, etc.)
        </div>
       
    
    </div>
  )
}
