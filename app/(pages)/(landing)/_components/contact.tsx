'use client'

import React, { useState } from 'react';

//const sendEmail = async ({ name, email, message }:any) => {
const sendEmail = async (formData:any) => {
  try{
      const res = await fetch('/api/contact', {
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      const text = await res.text();
      console.log(text)
} catch(err){
      throw err
}


}

function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async(e:any) => {
    e.preventDefault();
    // Perform form submission logic here
    try{
      const req = await sendEmail(formData);
      console.log(req)
      console.log('Form submitted:', formData);
      setFormData({
        name: '',
        email: '',
        message: '',
      });
      alert('Message sent successfully')
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }catch(err){
      throw err
    }
    
  };

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto text-center px-2 md:px-0">
        <h2 className="text-3xl font-semibold mb-4">Get in Touch</h2>
        <p className="text-gray-600 mb-8">
          Have questions? Need more information? Contact us today!
        </p>
        <div className="max-w-md mx-auto">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-lg focus:ring focus:ring-blue-300"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-gray-400"
                disabled={!formData.name || !formData.email || !formData.message}
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
