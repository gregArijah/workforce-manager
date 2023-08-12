import Navbar from "./_components/navbar";
import Header from "../_components/header"	;
import Coolstuff from "./_components/coolstuff";
import Slides from "./_components/slides";
import LoginButton from "./_components/loginbutton";
import LogoutButton from "./_components/logoutbutton";

import { useSession } from "next-auth/react";

const {data: session, status}= useSession();

export default function Landing(): JSX.Element {
 
  return (
    <div className='h-screen p-6'>     
      <div className="flex justify-between items-center">
        <Header />
        <Navbar /> 
        <LoginButton />
        <LogoutButton />


      </div>
      <Slides />
      <Coolstuff />    
    </div>
  )
}
