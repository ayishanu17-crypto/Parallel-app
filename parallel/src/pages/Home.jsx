import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RoomCard from "../components/RoomCard";

function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-950 to-black text-white">
      
      <Navbar />

      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center text-center py-20 px-6">
        <h1 className="text-5xl font-bold mb-4">
          Study Together. Stay Focused.
        </h1>
        <p className="text-gray-400 max-w-xl mb-6">
          Join live study rooms with real students. No distractions. No excuses.
        </p>
        <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-lg inline-block">
          Join a Room
        </Link>
      </div>

      {/* STATS SECTION */}
      <div className="px-10 py-10">
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div className="bg-gray-900/50 rounded-xl p-6">
            <div className="text-3xl font-bold text-blue-400 mb-2">1M+</div>
            <div className="text-gray-400">Community Members</div>
          </div>
          <div className="bg-gray-900/50 rounded-xl p-6">
            <div className="text-3xl font-bold text-green-400 mb-2">19M+</div>
            <div className="text-gray-400">Study Sessions</div>
          </div>
          <div className="bg-gray-900/50 rounded-xl p-6">
            <div className="text-3xl font-bold text-purple-400 mb-2">4M+</div>
            <div className="text-gray-400">Goals Achieved</div>
          </div>
          <div className="bg-gray-900/50 rounded-xl p-6">
            <div className="text-3xl font-bold text-orange-400 mb-2">215+</div>
            <div className="text-gray-400">Countries</div>
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="px-10 py-10">
        <h2 className="text-3xl font-bold text-center mb-10">Why Study Together?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-semibold mb-2">Ambient Accountability</h3>
            <p className="text-gray-400">Seeing others focused keeps you focused. No surveillance, just presence.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">Set Goals & Achieve</h3>
            <p className="text-gray-400">Track your progress, earn rewards, and celebrate milestones together.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="text-xl font-semibold mb-2">Global Community</h3>
            <p className="text-gray-400">Connect with motivated students from around the world, 24/7.</p>
          </div>
        </div>
      </div>

      {/* ROOMS SECTION */}
      <div className="px-10 pb-20">
        <h2 className="text-2xl font-semibold mb-6">Active Rooms</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-900 p-5 rounded-2xl shadow-lg hover:scale-105 transition">
            <img
              src="/images/study-room-1.jpg"
              alt="Study room with laptops"
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Mathematics Study Group</h3>
            <p className="text-gray-400 mb-4">12 people studying</p>
            <button className="bg-green-600 px-4 py-2 rounded-lg">
              Join
            </button>
          </div>

          <div className="bg-gray-900 p-5 rounded-2xl shadow-lg hover:scale-105 transition">
            <img
              src="/images/study-room-2.jpg"
              alt="Library study space"
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Physics Problem Solving</h3>
            <p className="text-gray-400 mb-4">8 people studying</p>
            <button className="bg-green-600 px-4 py-2 rounded-lg">
              Join
            </button>
          </div>

          <div className="bg-gray-900 p-5 rounded-2xl shadow-lg hover:scale-105 transition">
            <img
              src="/images/study-room-3.jpg"
              alt="Group study session"
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Chemistry Lab Prep</h3>
            <p className="text-gray-400 mb-4">15 people studying</p>
            <button className="bg-green-600 px-4 py-2 rounded-lg">
              Join
            </button>
          </div>

          <div className="bg-gray-900 p-5 rounded-2xl shadow-lg hover:scale-105 transition">
            <img
              src="/images/study-room-4.jpg"
              alt="Quiet study area"
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Biology Study Circle</h3>
            <p className="text-gray-400 mb-4">6 people studying</p>
            <button className="bg-green-600 px-4 py-2 rounded-lg">
              Join
            </button>
          </div>

          <div className="bg-gray-900 p-5 rounded-2xl shadow-lg hover:scale-105 transition">
            <img
              src="/images/study-room-5.jpg"
              alt="Computer science study"
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">CS Programming Session</h3>
            <p className="text-gray-400 mb-4">10 people studying</p>
            <button className="bg-green-600 px-4 py-2 rounded-lg">
              Join
            </button>
          </div>

          <div className="bg-gray-900 p-5 rounded-2xl shadow-lg hover:scale-105 transition">
            <img
              src="/images/study-room-6.jpg"
              alt="English literature study"
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">English Literature</h3>
            <p className="text-gray-400 mb-4">9 people studying</p>
            <button className="bg-green-600 px-4 py-2 rounded-lg">
              Join
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;