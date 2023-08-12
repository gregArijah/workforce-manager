import React from 'react';

function FeaturesSection() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-4">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-4">
            <div className="text-2xl mb-2">Easy Time Tracking</div>
            <p className="text-gray-600">Effortlessly track attendance with our intuitive admin interface.</p>
          </div>

          {/* Feature 2 */}
          <div className="p-4">
            <div className="text-2xl mb-2">Real-time Updates</div>
            <p className="text-gray-600">Stay updated with real-time notifications and reporting.</p>
          </div>

          {/* Feature 3 */}
          <div className="p-4">
            <div className="text-2xl mb-2">Data Security</div>
            <p className="text-gray-600">Your data is securely stored and protected, ensuring your privacy.</p>
          </div>

          {/* Add more features as needed */}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
