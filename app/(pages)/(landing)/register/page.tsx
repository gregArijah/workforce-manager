'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import bcrypt from 'bcryptjs';

//const bcrypt = require('bcryptjs'); 
const saltRounds = 10;

//console.log(bcrypt);
const addCompany = async (company:any) => {
  const api = `/api/company/`;
  try{
        const res = await fetch(api, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(company),    
        });
        const json = await res.json();
        return json;
    } catch (error) {
        throw error;
    }

  
}

function RegistrationForm() {
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const router = useRouter();
  
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    // Here you can handle the form submission, e.g., send the data to an API

    
    const hash = await bcrypt.hash(newPassword, saltRounds);
    const adminHash = await bcrypt.hash(newAdminPassword, saltRounds);
    const company = {name: newName, password: hash, adminPassword: adminHash};
    console.log(company);

    await addCompany(company);
    // await addCompany({name: newName, password: newPassword, adminPassword: newAdminPassword});
    alert(`Hello ${newName}, Welcome to Veleron!`);

    console.log('Company Name:', newName);
    console.log('Password:', hash);
    console.log('Admin Password:', adminHash);
    setNewName('');
    setNewPassword('');
    setNewAdminPassword('');
    router.push('/admin');

  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Registration Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="newName" className="block text-sm font-medium text-gray-700">
              Company Name:
            </label>
            <input
              type="text"
              id="newName"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="mt-1 p-2 w-full border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              General Password:
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label htmlFor="newAdminPassword" className="block text-sm font-medium text-gray-700">
              Admin Password:
            </label>
            <input
              type="password"
              id="newAdminPassword"
              value={newAdminPassword}
              onChange={(e) => setNewAdminPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
