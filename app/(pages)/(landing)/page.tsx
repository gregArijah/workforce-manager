import Navbar from "./_components/navbar";
import Header from "../_components/header"	;
import Coolstuff from "./_components/coolstuff";

export default function Landing(): JSX.Element {
 
  return (
    <div className='h-screen p-6'>  
      <Navbar />
      <Header />
      <Coolstuff />    
    </div>
  )
}
