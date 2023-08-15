'use client'

import React from 'react';
import Clock from 'react-live-clock'

export default function ClockDisplay() {

  return (
    <div className='flex flex-col text-right'>    
        <Clock className='text-sm md:text-2xl font-medium text-gray-300' format='dddd, MMM Do' noSsr={true} />
        <Clock className='text-3xl md:text-6xl text-gray-200' format='HH:mm:ss' ticking={true} noSsr={true} />
    </div>
  );
}
