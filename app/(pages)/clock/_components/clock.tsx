'use client'

import React from 'react';
import Clock from 'react-live-clock'

export default function ClockDisplay() {

  return (
    <div className='flex flex-col text-right'>    
        <Clock className='text-sm font-medium' format='dddd, MMM Do' noSsr={true} />
        <Clock className='text-3xl' format='HH:mm:ss' ticking={true} noSsr={true} />
    </div>
  );
}
