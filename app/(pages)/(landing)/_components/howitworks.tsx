import React from 'react';

function HowItWorksSection() {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-4">It's As Easy As</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="p-4">
            <div className="rounded-full bg-blue-500 text-white w-16 h-16 flex items-center justify-center mb-4">
              1
            </div>
            <div className="text-xl font-semibold mb-2">Register</div>
            <p className="text-gray-600">Create an account and get started with our punch clock system.</p>
          </div>

          {/* Step 2 */}
          <div className="p-4">
            <div className="rounded-full bg-blue-500 text-white w-16 h-16 flex items-center justify-center mb-4">
              2
            </div>
            <div className="text-xl font-semibold mb-2">Clock In/Out</div>
            <p className="text-gray-600">Employees can clock in and out with just the touch of a button.</p>
          </div>

          {/* Step 3 */}
          <div className="p-4">
            <div className="rounded-full bg-blue-500 text-white w-16 h-16 flex items-center justify-center mb-4">
              3
            </div>
            <div className="text-xl font-semibold mb-2">Stay Updated</div>
            <p className="text-gray-600">Log in from any connected device to complete payroll tasks.</p>
          </div>

          {/* Add more steps as needed */}
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
