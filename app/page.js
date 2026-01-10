import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to EMS</h1>
      <p className="mb-6">Employee Management Dashboard</p>
      <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded">
        Go to Login
      </Link>
    </div>
  );
}
