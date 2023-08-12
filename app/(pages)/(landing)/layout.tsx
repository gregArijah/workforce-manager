import Link from 'next/link'

export default async function ClockLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <div className="bg-cover bg-center h-screen" style={{ backgroundImage: "url('/vecteezy.jpg')"}}>
          <section className='p-2 md:p-12'>
              {children}
          </section>
        </div>
    )
  }
