export default async function ClockLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <div className="bg-cover bg-center h-screen" style={{ backgroundImage: "url('/vecteezy.jpg')"}}>
          <section>
              {children}
          </section>
        </div>
    )
  }
