import Header from "../_components/header"

export default function Login(): JSX.Element {
  return (
    <div>
      <Header />
      <div className="h-screen flex flex-col items-center justify-center">
          <div className='w-64 p-4 bg-gray-300 rounded shadow '>
            <p className='mb-4 text-center'>Log In</p>
            <input type='text' placeholder='Username' className='mb-4 p-2 w-full' />
            <input type='password' placeholder='Password' className='mb-4 p-2 w-full' />
            <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded'>
              Log In
            </button>
          </div>
      </div>
    </div>
  )
}
