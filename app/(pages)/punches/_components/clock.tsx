import React, { useState, useEffect } from "react";

export default function Clock() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    // Update the clock every second
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);




  return (
    <nav className='text-right'>
      <p>{dateTime.toLocaleDateString()}</p>
      <p>{dateTime.toLocaleTimeString([], { hour12: false })}</p>

    </nav>
  );
}
