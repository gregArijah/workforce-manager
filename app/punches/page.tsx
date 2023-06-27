'use client'

export default function Punches(): JSX.Element {

    function adminLoginAlert() {
        alert(`admin login form will appear here`)
    }

    function punchAlert() {
        alert(`punch in/out scrren will appear on click, for now its already showing together`)
    }

    return (
      <div className='h-screen'> 
            <nav className='text-right'>Navbar goes here: options for <span className='cursor-pointer text-red-700' onClick={adminLoginAlert} >&quot;adminLogin&quot;</span> form </nav>
      <br />
      <header className='text-left'>Header goes here: logo, name, and slogan</header>

        <p className="flex w-full justify-left border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl">
          NANJI - WORKFORCE MANAGER
        </p>  
        <div className = "flex justify-center items-center pt-24">
            same cool images as on other page goes in the background here.
        </div>
        <div>
            <p>component1</p>
            <button onClick={punchAlert} className="bg-green-300 p-4 rounded mb-16" >Punch In/Out</button>
        </div>
        <div>
            <p>component2</p>
            <form>
                <div>
                    <label>enter badge/id</label>
                    <input type="text" name="badge" />
                </div>
                <div className="space-x-2 mb-16">
                    <button type="button">go back</button> 
                    <button type="submit">submit</button>
                </div>
            </form>
        </div>
        <div>
            <p>component3</p>
            <p>Hello Johnny, You are now punched in</p>
            <p>your punch in time is: 9:00am</p>
            <br/>
            <p>OR</p>
            <br/>
            <p>You are now punched out</p>
            <p>your punch out time is: 5:00pm</p>
            <p>Goodbye Johnny</p>

        </div>



       
    
    </div>
        )
}

    