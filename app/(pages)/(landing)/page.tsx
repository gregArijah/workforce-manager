import Navbar from "./_components/navbar";
import Header from "../_components/header"	;
import Coolstuff from "./_components/coolstuff";
import Slides from "./_components/slides";
import SplitButton from "./_components/splitbutton";

export default function Landing(): JSX.Element {
 
  return (
    <div className='h-screen p-6'>     
      <div className="flex justify-between items-center">
        <Header />
        <Navbar /> 
        <SplitButton />

      </div>
      <Slides />
      <Coolstuff />    
    </div>
  )
}
