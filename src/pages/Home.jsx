import { Link } from "react-router-dom";

function Home() {
  return (
    // No Navbar, Footer, or min-h-screen here. 
    // The Layout handles the background and spacing.
    <div className="bg-gradient-to-br from-gray-950 to-black">
      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center text-center py-20 px-6">
        <h1 className="text-5xl font-bold mb-4">Study Together. Stay Focused.</h1>
        <p className="text-gray-400 max-w-xl mb-6">
          Join live study rooms with real students. No distractions. No excuses.
        </p>
        <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-lg inline-block">
          Join a Room
        </Link>
      </div>

      {/* ... keep the rest of your sections (Stats, Features, Rooms) here ... */}
    </div>
  );
}

export default Home;