import ChatBox from "../components/ChatBox";
import Pomodoro from "../components/Pomodoro";
import NotesEditor from "../components/NotesEditor";

function Room() {
  return (
    <div className="h-screen w-full bg-deep-950 flex overflow-hidden text-gray-200">
      
      {/* 1. Sidebar (Persistent Controls) */}
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-8">Focus Room</h2>
          <div className="space-y-4 text-sm text-gray-400">
            <div className="p-3 bg-white/5 rounded-lg border border-white/5">Timer: 25:00</div>
            <div className="p-3 bg-white/5 rounded-lg border border-white/5">Goal: CS Basics</div>
          </div>
        </div>
        <button className="w-full py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-sm hover:bg-red-500/20">
          Leave Session
        </button>
      </aside>

      {/* 2. Main Content (The "Workspace") */}
      <main className="flex-grow p-8 flex flex-col gap-6">
        {/* Glass Card for Video/Content */}
        <div className="flex-grow bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-2xl flex items-center justify-center">
          <p className="text-gray-500 italic">Video Feed or Canvas Here</p>
        </div>

        {/* Bottom Toolbar */}
        <div className="h-20 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl flex items-center px-6 gap-4">
          <button className="px-4 py-2 bg-accent-blue text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition">Start Pomodoro</button>
          <div className="h-8 w-px bg-white/10"></div>
          <span className="text-sm">12 people focused</span>
        </div>
      </main>

      {/* 3. Right Panel (Chat - Collapsible) */}
      <section className="w-80 border-l border-white/10 flex flex-col">
        <div className="p-4 border-b border-white/10 font-medium">Live Chat</div>
        <div className="flex-grow p-4 overflow-y-auto custom-scrollbar space-y-4">
          {/* Chat Messages */}
          <div className="text-xs text-gray-500">System: Welcome to the room.</div>
        </div>
        <input className="m-4 p-3 bg-white/5 border border-white/10 rounded-lg text-sm" placeholder="Message..." />
      </section>
    </div>
  );
}

export default Room;