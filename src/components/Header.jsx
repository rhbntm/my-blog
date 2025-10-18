import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-blue-950 shadow mb-6">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-white">My Blog</Link>
        <nav className="space-x-4">
          <Link to="/" className="text-white hover:text-blue-500">Home</Link>
          <Link to="/about" className="text-white hover:text-blue-500">About</Link>
        </nav>
      </div>
    </header>
  )
}
