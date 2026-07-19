import { Link } from "react-router-dom";

function Home() {
  return (
    // Changed from black/gray-950 gradient to app-bg (White)
    <div className="bg-app-bg text-app-text min-h-screen">
      
      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center text-center py-24 px-6 border-b border-app-border">
        <h1 className="text-5xl font-bold mb-6 tracking-tight">Study Together. Stay Focused.</h1>
        <p className="text-app-muted text-lg max-w-xl mb-8">
          Join live study rooms with real students. No distractions. No excuses.
        </p>
        <Link to="/signup" className="bg-accent-blue hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition shadow-sm">
          Join a Room
        </Link>
      </div>

      {/* FEATURES SECTION */}
      <div className="px-10 py-20 bg-app-card">
        <h2 className="text-3xl font-bold text-center mb-16 tracking-tight">Why Study Together?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Feature Card Pattern */}
          <div className="p-8 bg-white border border-app-border rounded-xl shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-semibold mb-2">Ambient Accountability</h3>
            <p className="text-app-muted">Seeing others focused keeps you focused.</p>
          </div>
          
          <div className="p-8 bg-white border border-app-border rounded-xl shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">Set Goals & Achieve</h3>
            <p className="text-app-muted">Track your progress and celebrate milestones.</p>
          </div>

          <div className="p-8 bg-white border border-app-border rounded-xl shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="text-xl font-semibold mb-2">Global Community</h3>
            <p className="text-app-muted">Connect with motivated students 24/7.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;