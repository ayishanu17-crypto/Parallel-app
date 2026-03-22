import ChatBox from "../components/ChatBox";
import Pomodoro from "../components/Pomodoro";
import NotesEditor from "../components/NotesEditor";

function Room() {
  const user = localStorage.getItem("userName");

  return (
    <div className="h-screen flex flex-col">

      {/* Top Bar */}
      <div className="flex justify-between items-center p-4 shadow">
        <h2 className="text-xl font-semibold">Parallel Room</h2>
        <p className="text-sm">👤 {user}</p>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1">

        {/* Left - Notes */}
        <div className="w-1/2 border-r p-4">
          <h3 className="font-semibold mb-2">Notes</h3>
          <NotesEditor />
        </div>

        {/* Right */}
        <div className="w-1/2 flex flex-col">

          {/* Timer */}
          <div className="p-4 border-b">
            <Pomodoro />
          </div>

          {/* Chat */}
          <div className="flex-1 p-4 overflow-y-auto">
            <ChatBox />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Room;