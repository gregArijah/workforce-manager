import Navbar from "./components/navbar";
import Header from "../components/header"	;
import Coolstuff from "./components/coolstuff";

export default function Landing(): JSX.Element {
 
  return (
    <div className='h-screen p-6'>  
      <Navbar />
      <Header />
      <Coolstuff />    
    </div>
  )
}
