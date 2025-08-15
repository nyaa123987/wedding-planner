'use client';

import { useRouter } from 'next/router';
import { florists } from '../../data/florists';
import H1 from '../../components/Heading1';

export default function FloristsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen py-10 px-5 bg-gray-50">
      <button
        onClick={() => router.push('/vendors')}
        className="mb-5 p-2 rounded-full hover:bg-gray-200"
      >
        ← Back to Vendors
      </button>

      <H1>Florists</H1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {florists.map((vendor) => (
          <div key={vendor.id} className="border p-4 rounded shadow bg-white flex flex-col">
            <h2 className="text-xl font-semibold mb-1">{vendor.name}</h2>
            <p className="text-gray-700 mb-1">{vendor.description}</p>
            <p className="text-gray-600 mb-1">
              <strong>Offerings:</strong> {vendor.offerings}
            </p>
            <p className="text-gray-600 mb-3">
              <strong>Location:</strong> {vendor.location}
            </p>
            <p className="text-gray-600 mb-3">
              <strong>Contact:</strong> {vendor.contact}
            </p>
            <button
              onClick={() => window.open(`mailto:${vendor.contact.split('|')[1]?.trim()}`, '_blank')}
              className="mt-auto bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Contact
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
