import ChatBox from "../components/ChatBox";
import Pomodoro from "../components/Pomodoro";
import NotesEditor from "../components/NotesEditor";

function Room() {
  return (
    // Use app-bg and app-text for consistency
    <div className="h-screen w-full bg-app-bg flex overflow-hidden text-app-text">
      
      {/* 1. Sidebar: Clean white, distinct border */}
      <aside className="w-64 border-r border-app-border p-6 flex flex-col justify-between bg-white">
        <div>
          <h2 className="text-xl font-bold mb-8 tracking-tight">Focus Room</h2>
          <div className="space-y-3">
            <div className="p-3 bg-app-card rounded-lg border border-app-border text-sm font-medium">Timer: 25:00</div>
            <div className="p-3 bg-app-card rounded-lg border border-app-border text-sm font-medium">Goal: CS Basics</div>
          </div>
        </div>
        <button className="w-full py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm font-medium hover:bg-red-100 transition">
          Leave Room
        </button>
      </aside>

      {/* 2. Main Workspace: Crisp White */}
      <main className="flex-grow p-8 flex flex-col gap-6 bg-app-card/50">
        <div className="flex-grow bg-white border border-app-border rounded-xl shadow-sm p-6 flex items-center justify-center">
          <p className="text-app-muted">Video Feed or Canvas</p>
        </div>

        {/* Bottom Toolbar: Consistent styling */}
        <div className="h-20 bg-white border border-app-border rounded-xl flex items-center px-6 shadow-sm">
          <button className="px-6 py-2 bg-accent-blue text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition shadow-sm">
            Start Pomodoro
          </button>
          <div className="h-8 w-px bg-app-border mx-6"></div>
          <span className="text-sm text-app-muted font-medium">12 people focused</span>
        </div>
      </main>

      {/* 3. Right Panel: Clean Chat */}
      <section className="w-80 border-l border-app-border flex flex-col bg-white">
        <div className="p-4 border-b border-app-border font-semibold text-sm">Live Chat</div>
        <div className="flex-grow p-4 overflow-y-auto space-y-4">
          <div className="text-xs text-app-muted">System: Welcome to the room.</div>
        </div>
        <input 
          className="m-4 p-3 bg-app-card border border-app-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue" 
          placeholder="Message..." 
        />
      </section>
    </div>
  );
}

export default Room;