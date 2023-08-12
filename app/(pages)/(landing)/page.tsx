import Session from "@/app/utils/serverSession";

import Navbar from "./_components/navbar";
import Header from "../_components/header"	;
import Coolstuff from "./_components/coolstuff";
import Slides from "./_components/slides";
import LoginButton from "./_components/loginbutton";
import LogoutButton from "./_components/logoutbutton";

export default async function Landing(): Promise<JSX.Element> {

  const session = await Session();
  console.log(!!session);

  return (
    <div className='h-full'>     
      <div className="flex justify-between items-center">
          <Header />
          {/* <Navbar />  */}
          {!session? <LoginButton />: null}
          {!!session? <LogoutButton />: null}
      </div>
      <Slides />
      <Coolstuff />    
    </div>
  )
}
