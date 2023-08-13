import Link from 'next/link'
import Image from 'next/image'

export default function Header() {

  return (
      <header className='text-left pb-6'>
        <Link href="/"  className= 'text-red-700'>
            <Image src='/veleron7.png' width={250} height={100} alt='logo'></Image>
        </Link>
       
      </header> 
  )
} 