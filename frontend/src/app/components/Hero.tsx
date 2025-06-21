'use client'

import { useRouter } from 'next/navigation';

export default function Hero() {
  const router = useRouter();

  const navigateDashboard = () => {
    router.push('/dashboard');
  }

  return (
    <section className="flex flex-col items-center justify-center text-center py-32 bg-gradient-to-b from-blue-50 to-white">
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-6">
        LabelAI
      </h1>
      <p className="mb-10 text-gray-600 max-w-2xl text-lg md:text-xl">
        Train your models effortlessly by with the best labelled data.
      </p>
      <div className="space-x-4">
        <button className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold shadow hover:bg-blue-700 transition" onClick={navigateDashboard}>
          Start Labelling
        </button>
        <button className="px-8 py-4 bg-white border border-blue-600 text-blue-600 rounded-full font-semibold shadow hover:bg-blue-50 transition">
          Learn More
        </button>
      </div>
    </section>
  );
}
