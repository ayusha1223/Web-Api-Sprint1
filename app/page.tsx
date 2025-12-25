'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Welcome to Naayu Attires
        </h1>

        <p className="text-gray-600 mb-6">
         Grace Stitched into every kurthas
        </p>

        <button
          onClick={() => router.push('/login')}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Start Now
        </button>
      </div>
    </main>
  );
}
