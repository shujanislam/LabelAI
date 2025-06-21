export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
      <a href="/"><h1 className="text-2xl font-extrabold text-blue-600">LabelAI</h1></a>
      <div className="space-x-6">
        <a href="#features" className="text-gray-700 font-medium hover:text-blue-600 transition">Features</a>
        <a href="#contact" className="text-gray-700 font-medium hover:text-blue-600 transition">Contact</a>
      </div>
    </nav>
  );
}
