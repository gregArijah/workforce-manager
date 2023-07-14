import Navbar from "./_components/navbar";
import Header from "../_components/header"	;
import Coolstuff from "./_components/coolstuff";
import Slides from "./_components/slides";

export default function Landing(): JSX.Element {
 
  return (
    <div className='h-screen p-6'>     
      <div className="flex justify-between items-center">
        <Header />
        <Navbar />      
      </div>
      <Slides />
      <Coolstuff />    
    </div>
  )
}
