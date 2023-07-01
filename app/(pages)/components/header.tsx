import Link from 'next/link'

export default function Header() {

  return (
      <header className='text-left'>
        <h1>Header goes here: logo, name, and slogan</h1>
        <Link href="/"  className= 'text-red-700'>
            <p>WORKFORCE MANAGER</p>
        </Link>
      </header> 
  )
} 