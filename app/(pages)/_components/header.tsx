import Link from 'next/link'
import Image from 'next/image'

export default function Header() {

  return (
      <header className='text-left md:pb-6'>
        <Link href="/"  className= 'text-red-700'>
            <Image className='md:hidden' src='/veleron7.png' width={125} height={100} alt='logo'></Image>
            <Image className='hidden md:block'src='/veleron7.png' width={250} height={100} alt='logo'></Image>
        </Link>
       
      </header> 
  )
} 