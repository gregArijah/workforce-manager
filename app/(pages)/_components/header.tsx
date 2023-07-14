import Link from 'next/link'

export default function Header() {

  return (
      <header className='text-left'>
        <Link href="/"  className= 'text-red-700'>
            <p className='text-lg'>WORKFORCE MANAGER  **LOGO**</p>
            <p>slogan text</p>
        </Link>
      </header> 
  )
} 