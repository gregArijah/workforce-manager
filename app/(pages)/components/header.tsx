import Link from 'next/link'

const styles = {
  background: {
    background: 'rgb(191, 208, 212)',
    color: 'rgb(246, 246, 237)'
  }
};

export default function Header() {
  return (
    // className='text-left'
    // style={styles.background}
    <header className="flex justify-between items-center my-2" >
      {/* className='bold' */}
      <Link href="/" className=" text-slate-800 px-2 py-1 rounded hover:text-slate-500 outline-none text-2xl">
        <h1>WORKFORCE MANAGER</h1>
      </Link>

      <p >logo & slogan</p>
    </header>
  )
} ''