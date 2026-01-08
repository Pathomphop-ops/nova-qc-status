import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          QC Checklist Scanner
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Use your device camera to scan the QR code on the workpiece.
        </p>
        <Link
          href="/scanner"
          className="inline-block rounded-lg bg-blue-600 px-8 py-4 text-xl font-semibold text-white shadow-md transition-transform duration-150 ease-in-out hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Start Scan
        </Link>
      </div>
    </main>
  );
}
