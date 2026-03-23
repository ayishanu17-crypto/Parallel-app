import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const isLoggedIn = location.pathname === "/dashboard";

  return (
    <div className="flex justify-between items-center px-8 py-4 bg-black border-b border-gray-800">
      <Link to="/" className="flex items-center space-x-3">
        {/* Two Lines Tilted Left */}
        <svg width="28" height="28" viewBox="0 0 28 28" className="flex-shrink-0">
          <g transform="rotate(-8 14 14)">
            {/* Left line */}
            <rect x="7" y="4" width="2" height="20" rx="1" fill="#e5e7eb" />
            {/* Right line */}
            <rect x="19" y="4" width="2" height="20" rx="1" fill="#e5e7eb" />
          </g>
        </svg>
        <h1 className="text-xl font-bold text-gray-100">Parallel</h1>
      </Link>
      {!isLoggedIn && (
        <div className="flex items-center space-x-4">
          <Link to="/login" className="text-gray-300 hover:text-white px-4 py-2 rounded-lg transition">
            Login
          </Link>
          <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition">
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;