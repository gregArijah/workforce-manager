import Navbar from "./components/navbar";
import Header from "../components/header"	;
import Coolstuff from "./components/coolstuff";

export default async function Landing() {
 
  return (
    <div className='h-screen p-6'>  
      <Navbar />
      <Header />
      <Coolstuff />    
    </div>
  )
}
