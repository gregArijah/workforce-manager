import React from 'react';

function TestimonialsSection() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-4">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="p-4 border rounded-lg shadow-md">
            <div className="text-xl font-semibold mb-2">John Doe</div>
            <p className="text-gray-600 mb-4">
              &quot;Using the punch clock app has made tracking my work hours a breeze. It&apos;s so simple and convenient.&quot;
            </p>
            <div className="text-blue-500 font-semibold">Read More</div>
          </div>

          {/* Testimonial 2 */}
          <div className="p-4 border rounded-lg shadow-md">
            <div className="text-xl font-semibold mb-2">Jane Smith</div>
            <p className="text-gray-600 mb-4">
              &quot;I love the flexibility this app offers. Whether I&apos;m in the office or working remotely, I can easily clock in and out.&quot;
            </p>
            <div className="text-blue-500 font-semibold">Read More</div>
          </div>

          {/* Testimonial 3 */}
          <div className="p-4 border rounded-lg shadow-md">
            <div className="text-xl font-semibold mb-2">Alex Johnson</div>
            <p className="text-gray-600 mb-4">
              &quot;The punch clock system has improved our team&apos;s time management and accountability. Highly recommended!&quot;
            </p>
            <div className="text-blue-500 font-semibold">Read More</div>
          </div>

          {/* Add more testimonials as needed */}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
