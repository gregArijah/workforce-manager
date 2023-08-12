import Session from "@/app/utils/serverSession";

// import Navbar from "./_components/navbar";
// import Header from "../_components/header"	;
// import Coolstuff from "./_components/coolstuff";
// import Slides from "./_components/slides";
// import LoginButton from "./_components/loginbutton";
// import LogoutButton from "./_components/logoutbutton";
import HeroSection from "./_components/herosection";
import HeaderSection from "./_components/header";
import FeaturesSection from "./_components/features";
import HowItWorksSection from "./_components/howitworks";
import TestimonialsSection from "./_components/testimonials";
import ContactSection from "./_components/contact";
import Footer from "./_components/footer";

export default async function Landing(): Promise<JSX.Element> {

  const session = await Session();
  console.log(!!session);

  return (
    <div className='h-full'>     
    
      <HeaderSection session={session}/>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />

      {/* <Slides />
      <Coolstuff />     */}
    </div>
  )
}

// import React from 'react';
// import Header from './Header'; // Component with the project name and login/logout button
// import HeroSection from './HeroSection';
// import FeaturesSection from './FeaturesSection';
// import HowItWorksSection from './HowItWorksSection';
// import TestimonialsSection from './TestimonialsSection';
// import ContactSection from './ContactSection';
// import Footer from './Footer'; // Include any footer content or links

// function LandingPage() {
//   return (
//     <div>
//       <Header />
//       <HeroSection />
//       <FeaturesSection />
//       <HowItWorksSection />
//       <TestimonialsSection />
//       <ContactSection />
//       <Footer />
//     </div>
//   );
// }

// export default LandingPage;  

// <div className="flex justify-between items-center">
//           <Header />
//           {/* <Navbar />  */}
//           {!session? <LoginButton />: null}
//           {!!session? <LogoutButton />: null}
//       </div>