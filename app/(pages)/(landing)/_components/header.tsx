import React from 'react';
import Link from 'next/link';
import Header from '../../_components/header';
import LoginButton from './loginbutton';
import LogoutButton from './logoutbutton';

function HeaderSection({ session }: { session: any }) {
  return (
    <header className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
      <Header />
      {/* <Navbar /> */}
      {!session ? <LoginButton /> : null}
      {!!session ? <LogoutButton /> : null}
    </header>
  );
}

export default HeaderSection;


// import React from 'react';
// //import Logo from './Logo'; // Replace with your logo component
// //import { Link } from 'react-router-dom'; // Replace with your preferred routing library
// import Link from 'next/link';
// import Header from '../../_components/header';
// import LoginButton from './loginbutton';
// import LogoutButton from './logoutbutton';


// function HeaderSection({session} : { session:any}) {
  

//   return (
//     <header className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
    
//           <Header />
//           {/* <Navbar />  */}
//           {!session? <LoginButton />: null}
//           {!!session? <LogoutButton />: null}
      
//       {/* <Header />

//       <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full">
//         Log In
//       </Link> */}
//     </header>
//   );
// }

// export default HeaderSection;
