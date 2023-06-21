import React, { useState } from 'react'
import prisma from './lib/prisma'
import Searchbar from './components/searchbar';

export default async function Home() {
 

  //const company = await prisma.company.findMany(); 
  const company = await prisma.company.findMany();

  const selectedCompany = await prisma.company.findUnique({
    where: { id: "clj3c6bq80000v25004a9pzfn" },
    include: { departments: true, employees: true },
  });

  const allEmployees = await prisma.employee.findMany({
    include: { department: true },
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          NANJI - WORKFORCE MANAGER
        </p>
       
      </div>
      <div>
        <Searchbar />
        <h2>Client List</h2>
        <ul>
          {company.map((company) => (
            <li key={company.id}>
              {company.name}
            </li>
          ))}
        </ul>
        <h2>Selected Client</h2>
        <p>
          {selectedCompany? selectedCompany.name : "No company selected"}
        </p>
        <h2>All Employee</h2>
        <ul>
          {allEmployees.map((employee) => (
            <li key={employee.id}>
              {employee.name}
            </li>
          ))}
        </ul>
      </div>
    

      
    </div>
  )
}
