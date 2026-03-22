import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ChatBox from "../components/ChatBox";
import NotesEditor from "../components/NotesEditor";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("rooms");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [joinedRoom, setJoinedRoom] = useState(null);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [roomType, setRoomType] = useState("public");
  const [roomSubject, setRoomSubject] = useState("math");
  const [roomPassword, setRoomPassword] = useState("");
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);
  const [doubtInput, setDoubtInput] = useState("");
  const [timerSeconds, setTimerSeconds] = useState(300);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [notes, setNotes] = useState([
    { id: 1, title: "Mathematics Basics", subject: "math", content: "Understanding fundamentals...", timestamp: "Feb 20, 2026" },
    { id: 2, title: "Physics Notes", subject: "physics", content: "Mechanics and motion...", timestamp: "Feb 19, 2026" }
  ]);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [rooms, setRooms] = useState([
    { id: 1, name: "Mathematics Study Group", subject: "math", participants: 12, type: "public", status: "active", creator: "John" },
    { id: 2, name: "Physics Problem Solving", subject: "physics", participants: 8, type: "public", status: "active", creator: "Sarah" },
    { id: 3, name: "Chemistry Lab Prep", subject: "chemistry", participants: 15, type: "public", status: "active", creator: "Mike" },
    { id: 4, name: "Private Study Circle", subject: "biology", participants: 4, type: "private", status: "active", creator: "Emma" },
    { id: 5, name: "Advanced CS Algorithms", subject: "cs", participants: 20, type: "public", status: "active", creator: "Dev" },
    { id: 6, name: "Literature Discussion", subject: "english", participants: 9, type: "public", status: "active", creator: "Alex" },
  ]);

  const subjects = [
    { value: "all", label: "All Subjects" },
    { value: "math", label: "Mathematics" },
    { value: "physics", label: "Physics" },
    { value: "chemistry", label: "Chemistry" },
    { value: "biology", label: "Biology" },
    { value: "cs", label: "Computer Science" },
    { value: "english", label: "English" },
  ];

  const flashcardData = {
    math: [
      { question: "What is the derivative of x²?", answer: "2x" },
      { question: "What is √16?", answer: "4" },
      { question: "What is the area of a circle with radius 5?", answer: "25π ≈ 78.5" },
      { question: "Solve: 2x + 5 = 13", answer: "x = 4" },
      { question: "What is the sum of angles in a triangle?", answer: "180 degrees" },
    ],
    physics: [
      { question: "What is the formula for kinetic energy?", answer: "KE = ½mv²" },
      { question: "What is Newton's First Law of Motion?", answer: "An object stays at rest unless acted upon by force" },
      { question: "What is the speed of light?", answer: "3 × 10⁸ m/s" },
      { question: "What is F = ma?", answer: "Newton's Second Law" },
      { question: "Define velocity", answer: "Speed with direction" },
    ],
    chemistry: [
      { question: "What is H₂O?", answer: "Water" },
      { question: "What is the atomic number of Carbon?", answer: "6" },
      { question: "What is pH of neutral solution?", answer: "7" },
      { question: "What is Avogadro's number?", answer: "6.022 × 10²³" },
      { question: "What is a covalent bond?", answer: "Sharing of electrons" },
    ],
    biology: [
      { question: "What is the powerhouse of the cell?", answer: "Mitochondria" },
      { question: "How many chambers in a human heart?", answer: "4" },
      { question: "What is the basic unit of life?", answer: "Cell" },
      { question: "What do plants use for photosynthesis?", answer: "Sunlight, water, and CO₂" },
      { question: "What is DNA?", answer: "Deoxyribonucleic acid" },
    ],
    cs: [
      { question: "What is an array?", answer: "Ordered collection of elements" },
      { question: "What does API stand for?", answer: "Application Programming Interface" },
      { question: "What is Big O notation?", answer: "Measure of algorithm complexity" },
      { question: "What is a loop?", answer: "Repeats code multiple times" },
      { question: "What is recursion?", answer: "Function calling itself" },
    ],
    english: [
      { question: "What is a metaphor?", answer: "Direct comparison without 'like' or 'as'" },
      { question: "Who wrote Romeo and Juliet?", answer: "William Shakespeare" },
      { question: "What is a noun?", answer: "A person, place, or thing" },
      { question: "What is an adverb?", answer: "Modifies verb, adjective, or adverb" },
      { question: "What is irony?", answer: "Opposite of what is expected" },
    ]
  };

  const quizData = {
    math: [
      { question: "What is 15 × 12?", options: ["150", "160", "180", "200"], correct: 2 },
      { question: "What is the square root of 144?", options: ["10", "11", "12", "13"], correct: 2 },
      { question: "What percent is 25 out of 100?", options: ["20%", "25%", "30%", "35%"], correct: 1 },
      { question: "What is 5! (factorial)?", options: ["15", "60", "120", "150"], correct: 2 },
      { question: "What integer comes between 99 and 101?", options: ["99.5", "100", "101.5", "102"], correct: 1 },
    ],
    physics: [
      { question: "Which force keeps planets in orbit?", options: ["Friction", "Gravity", "Magnetism", "Tension"], correct: 1 },
      { question: "What is the SI unit of force?", options: ["Joule", "Newton", "Watt", "Pascal"], correct: 1 },
      { question: "What is acceleration?", options: ["Change in position", "Change in velocity", "Change in time", "Change in mass"], correct: 1 },
      { question: "What reflects light the most?", options: ["Paper", "Mirror", "Glass", "Water"], correct: 1 },
      { question: "What is zero if an object is in equilibrium?", options: ["Velocity", "Speed", "Net force", "Acceleration"], correct: 2 },
    ],
    chemistry: [
      { question: "How many atoms in O₂?", options: ["1", "2", "3", "4"], correct: 1 },
      { question: "What is the most abundant element in Earth's atmosphere?", options: ["Oxygen", "Nitrogen", "Argon", "CO₂"], correct: 1 },
      { question: "What is the charge of a proton?", options: ["Negative", "Positive", "Neutral", "None"], correct: 1 },
      { question: "What is a solution?", options: ["Mixture of gases", "Single substance", "Homogeneous mixture", "Heterogeneous mixture"], correct: 2 },
      { question: "What is rust?", options: ["Iron oxide", "Iron metal", "Iron hydroxide", "Iron nitride"], correct: 0 },
    ],
    biology: [
      { question: "Which organelle stores genetic information?", options: ["Ribosome", "Nucleus", "Lysosome", "Peroxisome"], correct: 1 },
      { question: "What is photosynthesis?", options: ["Breakdown of glucose", "Making glucose from light", "Breaking down ATP", "Storing energy"], correct: 1 },
      { question: "How many bones in adult human body?", options: ["186", "206", "230", "270"], correct: 1 },
      { question: "What are antibodies?", options: ["Viruses", "Proteins", "Cells", "Bacteria"], correct: 1 },
      { question: "What is the function of red blood cells?", options: ["Fight infection", "Transport oxygen", "Store energy", "Digest food"], correct: 1 },
    ],
    cs: [
      { question: "What does HTML stand for?", options: ["HyperText Markup Language", "High Tech Modern Logic", "Home Tool Mark Language", "Hyper Technical Modern Lab"], correct: 0 },
      { question: "Which is NOT a programming language?", options: ["Python", "HTML", "Java", "C++"], correct: 1 },
      { question: "What does CPU stand for?", options: ["Central Processing Unit", "Central Program Utility", "Computer Personal Unit", "Central Processor Utility"], correct: 0 },
      { question: "What is version control used for?", options: ["Security", "Tracking changes", "Speed", "Compression"], correct: 1 },
      { question: "What does API stand for?", options: ["Application Programming Interface", "Application Program Index", "Application Procedure Interface", "Applied Programming Interface"], correct: 0 },
    ],
    english: [
      { question: "What is a verb?", options: ["Descriptive word", "Action word", "Person/place thing", "Connecting word"], correct: 1 },
      { question: "Who is the author of Hamlet?", options: ["Jane Austen", "Mark Twain", "William Shakespeare", "Charles Dickens"], correct: 2 },
      { question: "What is a simile?", options: ["Same meaning", "Comparison with like/as", "Opposite meaning", "Exaggeration"], correct: 1 },
      { question: "What is the past tense of go?", options: ["Goes", "Went", "Going", "Gone"], correct: 1 },
      { question: "What is an adjective?", options: ["Verb", "Action", "Descriptive word", "Location"], correct: 2 },
    ]
  };

  // Timer effect
  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => {
      setTimerSeconds(prev => {
        if (prev <= 1) {
          setIsTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Camera access
  useEffect(() => {
    if (cameraEnabled && videoRef.current && !streamRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => console.log("Camera access denied:", err));
    } else if (!cameraEnabled && streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }, [cameraEnabled]);

  const filteredRooms = selectedSubject === "all"
    ? rooms
    : rooms.filter(room => room.subject === selectedSubject);

  const joinRoom = (roomId) => {
    const room = rooms.find(r => r.id === roomId);
    if (room.type === "private") {
      const password = prompt(`This is a private room. Enter password to join:`);
      if (password !== roomPassword) {
        alert("Incorrect password!");
        return;
      }
    }
    setJoinedRoom(roomId);
    setActiveTab("study");
    setActiveFeature(null);
    setTimerSeconds(300);
  };

  const createRoom = (e) => {
    e.preventDefault();
    if (!roomName.trim()) {
      alert("Please enter a room name");
      return;
    }
    if (roomType === "private" && !roomPassword) {
      alert("Please set a password for your private room");
      return;
    }

    const newRoom = {
      id: rooms.length + 1,
      name: roomName,
      subject: roomSubject,
      participants: 1,
      type: roomType,
      status: "active",
      creator: "You",
      password: roomType === "private" ? roomPassword : null
    };

    setRooms([...rooms, newRoom]);
    setJoinedRoom(newRoom.id);
    setShowCreateRoom(false);
    setRoomName("");
    setRoomPassword("");
    setActiveTab("study");
  };

  const leaveRoom = () => {
    setJoinedRoom(null);
    setCameraEnabled(false);
    setVoiceEnabled(false);
    setActiveFeature(null);
    setIsTimerRunning(false);
    setCurrentCardIndex(0);
    setCurrentQuizIndex(0);
    setSelectedAnswers({});
    setActiveTab("rooms");
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (joinedRoom && activeTab === "study") {
    const room = rooms.find(r => r.id === joinedRoom);
    return (
      <div className="flex flex-col min-h-screen bg-black text-white">
        <Navbar />

        {/* Top Bar */}
        <div className="bg-gray-900 border-b border-gray-800 px-6 py-3 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">{room.name}</h2>
            <p className="text-sm text-gray-400">👥 {room.participants} participants</p>
          </div>
          <div className="text-3xl font-bold text-blue-400">{formatTime(timerSeconds)}</div>
          <button
            onClick={leaveRoom}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg transition font-semibold"
          >
            Leave Room
          </button>
        </div>

        {/* Main Layout: Features | Video | Chat */}
        <div className="flex flex-1 overflow-hidden gap-4 p-4">
          {/* Left: Study Features */}
          <div className="w-48 bg-gray-900/50 rounded-lg border border-gray-800 p-4 overflow-y-auto">
            <div className="space-y-2">
              <button
                onClick={() => setActiveFeature("flashcards")}
                className={`w-full text-left px-4 py-3 rounded-lg transition ${
                  activeFeature === "flashcards" ? "bg-blue-600" : "hover:bg-gray-800"
                }`}
              >
                🧠 Flashcards
              </button>
              <button
                onClick={() => setActiveFeature("quiz")}
                className={`w-full text-left px-4 py-3 rounded-lg transition ${
                  activeFeature === "quiz" ? "bg-blue-600" : "hover:bg-gray-800"
                }`}
              >
                📝 Quiz
              </button>
              <button
                onClick={() => setActiveFeature("scheduler")}
                className={`w-full text-left px-4 py-3 rounded-lg transition ${
                  activeFeature === "scheduler" ? "bg-blue-600" : "hover:bg-gray-800"
                }`}
              >
                📅 Scheduler
              </button>
              <button
                onClick={() => setActiveFeature("whiteboard")}
                className={`w-full text-left px-4 py-3 rounded-lg transition ${
                  activeFeature === "whiteboard" ? "bg-blue-600" : "hover:bg-gray-800"
                }`}
              >
                🎨 Whiteboard
              </button>
            </div>
          </div>

          {/* Center: Main Feature/Video Area */}
          <div className="flex-1 bg-gray-900/50 rounded-lg border border-gray-800 overflow-hidden flex flex-col">
            {activeFeature ? (
              // Full-size Feature Content
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Feature Header */}
                <div className="bg-gray-800 px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                  <h3 className="text-lg font-semibold">
                    {activeFeature === "flashcards" && "🧠 Flashcards"}
                    {activeFeature === "quiz" && "📝 Quiz"}
                    {activeFeature === "scheduler" && "📅 Scheduler"}
                    {activeFeature === "whiteboard" && "🎨 Whiteboard"}
                  </h3>
                  <button
                    onClick={() => {
                      setActiveFeature(null);
                      setCurrentCardIndex(0);
                      setCurrentQuizIndex(0);
                      setSelectedAnswers({});
                    }}
                    className="text-gray-400 hover:text-white text-xl font-bold"
                  >
                    ✕
                  </button>
                </div>

                {/* Feature Content */}
                <div className="flex-1 p-8 overflow-y-auto">
                  {activeFeature === "flashcards" && (
                    <div className="max-w-2xl mx-auto">
                      <div className="text-center">
                        <div className="text-sm text-gray-400 mb-4">Card {currentCardIndex + 1} of {flashcardData[room.subject]?.length || 5}</div>
                        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-12 min-h-64 flex items-center justify-center mb-6 cursor-pointer hover:shadow-xl transition">
                          <div className="text-center">
                            <p className="text-white text-2xl font-bold">{flashcardData[room.subject]?.[currentCardIndex]?.question || "Loading..."}</p>
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm mb-6">Answer: {flashcardData[room.subject]?.[currentCardIndex]?.answer}</p>
                        <div className="flex gap-4 justify-center">
                          <button
                            onClick={() => setCurrentCardIndex(Math.max(0, currentCardIndex - 1))}
                            className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg transition"
                            disabled={currentCardIndex === 0}
                          >
                            ← Previous
                          </button>
                          <button
                            onClick={() => setCurrentCardIndex(Math.min(flashcardData[room.subject]?.length - 1 || 4, currentCardIndex + 1))}
                            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition"
                          >
                            Next →
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeFeature === "quiz" && (
                    <div className="max-w-3xl mx-auto">
                      <div>
                        <div className="text-sm text-gray-400 mb-4">Question {currentQuizIndex + 1} of {quizData[room.subject]?.length || 5}</div>
                        <h4 className="text-xl font-semibold mb-6">{quizData[room.subject]?.[currentQuizIndex]?.question}</h4>
                        <div className="space-y-3 mb-8">
                          {quizData[room.subject]?.[currentQuizIndex]?.options.map((option, idx) => (
                            <button
                              key={idx}
                              onClick={() => setSelectedAnswers({ ...selectedAnswers, [currentQuizIndex]: idx })}
                              className={`w-full text-left px-6 py-3 rounded-lg border-2 transition ${
                                selectedAnswers[currentQuizIndex] === idx
                                  ? "border-blue-600 bg-blue-600/20"
                                  : "border-gray-600 hover:border-gray-400"
                              }`}
                            >
                              {String.fromCharCode(65 + idx)}. {option}
                            </button>
                          ))}
                        </div>
                        <div className="flex gap-4">
                          <button
                            onClick={() => setCurrentQuizIndex(Math.max(0, currentQuizIndex - 1))}
                            className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg transition"
                            disabled={currentQuizIndex === 0}
                          >
                            ← Previous
                          </button>
                          <button
                            onClick={() => setCurrentQuizIndex(Math.min(quizData[room.subject]?.length - 1 || 4, currentQuizIndex + 1))}
                            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition"
                          >
                            Next →
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeFeature === "scheduler" && (
                    <div className="max-w-2xl mx-auto">
                      <h4 className="text-xl font-semibold mb-6">Today's Study Schedule</h4>
                      <div className="space-y-4">
                        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-semibold">📌 Topic Review</p>
                              <p className="text-sm text-gray-400">Revise core concepts</p>
                            </div>
                            <p className="text-lg font-bold text-blue-400">5:00 PM</p>
                          </div>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-semibold">📌 Problem Solving</p>
                              <p className="text-sm text-gray-400">Practice with exercises</p>
                            </div>
                            <p className="text-lg font-bold text-blue-400">6:00 PM</p>
                          </div>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-semibold">📌 Group Discussion</p>
                              <p className="text-sm text-gray-400">Discuss with peers</p>
                            </div>
                            <p className="text-lg font-bold text-blue-400">7:00 PM</p>
                          </div>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-semibold">📌 Quiz & Review</p>
                              <p className="text-sm text-gray-400">Test your knowledge</p>
                            </div>
                            <p className="text-lg font-bold text-blue-400">8:00 PM</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeFeature === "whiteboard" && (
                    <div className="max-w-4xl mx-auto text-center">
                      <div className="bg-white rounded-lg h-96 flex items-center justify-center">
                        <p className="text-gray-600 text-lg">Whiteboard drawing area - Draw and share with peers</p>
                      </div>
                      <div className="mt-6 space-y-2">
                        <p className="text-sm text-gray-400">Drawing tools will appear here</p>
                        <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition">
                          Click to Start Drawing
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Default: Video Call Interface
              <div className="flex-1 bg-gray-950 relative flex items-center justify-center">
                {cameraEnabled ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <div className="text-6xl mb-4">📹</div>
                    <p className="text-gray-400">Camera is Off</p>
                  </div>
                )}

                {/* Floating Controls */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 bg-gray-800/80 px-4 py-3 rounded-full">
                  <button
                    onClick={() => setCameraEnabled(!cameraEnabled)}
                    className={`px-4 py-2 rounded-full font-semibold transition ${
                      cameraEnabled
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {cameraEnabled ? "📹" : "📹"}
                  </button>
                  <button
                    onClick={() => setVoiceEnabled(!voiceEnabled)}
                    className={`px-4 py-2 rounded-full font-semibold transition ${
                      voiceEnabled
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {voiceEnabled ? "🔴" : "🎤"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Chat & AI Doubt */}
          <div className="w-80 bg-gray-900/50 rounded-lg border border-gray-800 flex flex-col overflow-hidden">
            {/* Chat Section */}
            <div className="flex-1 overflow-y-auto p-4 border-b border-gray-800">
              <h3 className="text-sm font-semibold mb-3">💬 Live Chat</h3>
              <ChatBox />
            </div>

            {/* AI Doubt Input */}
            <div className="p-4 border-t border-gray-800">
              <h3 className="text-sm font-semibold mb-3">🤖 Ask AI</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={doubtInput}
                  onChange={(e) => setDoubtInput(e.target.value)}
                  placeholder="Ask a doubt..."
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-sm font-semibold">
                  Send
                </button>
              </div>
            </div>

            {/* Timer Controls */}
            <div className="p-4 border-t border-gray-800 text-center">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`w-full px-3 py-2 rounded font-semibold text-sm ${
                  isTimerRunning
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {isTimerRunning ? "⏸ Pause" : "▶ Start"} Study Timer
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-950 to-black text-white">
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900/50 border-r border-gray-800 p-6">
          <div className="space-y-2">
            <button
              onClick={() => setActiveTab("rooms")}
              className={`w-full text-left px-4 py-3 rounded-lg transition ${
                activeTab === "rooms" ? "bg-blue-600" : "hover:bg-gray-800"
              }`}
            >
              📚 Study Rooms
            </button>
            <button
              onClick={() => setActiveTab("notes")}
              className={`w-full text-left px-4 py-3 rounded-lg transition ${
                activeTab === "notes" ? "bg-blue-600" : "hover:bg-gray-800"
              }`}
            >
              📝 My Notes
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {activeTab === "rooms" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Study Rooms</h2>
                <button
                  onClick={() => setShowCreateRoom(!showCreateRoom)}
                  className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg transition"
                >
                  {showCreateRoom ? "Cancel" : "+ Create Room"}
                </button>
              </div>

              {/* Create Room Form */}
              {showCreateRoom && (
                <div className="bg-gray-900/50 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold mb-4">Create a New Study Room</h3>
                  <form onSubmit={createRoom} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Room Name</label>
                        <input
                          type="text"
                          value={roomName}
                          onChange={(e) => setRoomName(e.target.value)}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., Advanced Mathematics Study"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Subject</label>
                        <select
                          value={roomSubject}
                          onChange={(e) => setRoomSubject(e.target.value)}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {subjects.filter(s => s.value !== "all").map(s => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Room Type</label>
                        <select
                          value={roomType}
                          onChange={(e) => setRoomType(e.target.value)}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="public">🌐 Public (Anyone can join)</option>
                          <option value="private">🔒 Private (Password required)</option>
                        </select>
                      </div>

                      {roomType === "private" && (
                        <div>
                          <label className="block text-sm font-medium mb-2">Room Password</label>
                          <input
                            type="password"
                            value={roomPassword}
                            onChange={(e) => setRoomPassword(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter room password"
                          />
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg font-semibold transition"
                    >
                      Create & Join Room
                    </button>
                  </form>
                </div>
              )}

              {/* Subject Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Filter by Subject:</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {subjects.map(subject => (
                    <option key={subject.value} value={subject.value}>
                      {subject.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rooms Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRooms.map(room => (
                  <div key={room.id} className="bg-gray-900/50 rounded-xl p-6 hover:scale-105 transition">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold">{room.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded ${room.type === "public" ? "bg-green-600" : "bg-red-600"}`}>
                        {room.type === "public" ? "🌐 Public" : "🔒 Private"}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-2">👤 {room.participants} studying</p>
                    <p className="text-gray-500 text-sm mb-4">Created by: {room.creator}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-green-400 text-sm">● Active</span>
                      <button
                        onClick={() => joinRoom(room.id)}
                        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition"
                      >
                        Join Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "notes" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">My Notes</h2>
                <button
                  onClick={() => setCurrentNoteId(null)}
                  className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg transition"
                >
                  + New Note
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Notes List */}
                <div className="md:col-span-1 bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                  <h3 className="font-semibold mb-4">Your Notes</h3>
                  <div className="space-y-2">
                    {notes.map(note => (
                      <button
                        key={note.id}
                        onClick={() => setCurrentNoteId(note.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition ${
                          currentNoteId === note.id
                            ? "bg-blue-600"
                            : "hover:bg-gray-800 bg-gray-800/50"
                        }`}
                      >
                        <p className="font-medium truncate">{note.title}</p>
                        <p className="text-xs text-gray-400">{note.timestamp}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes Editor */}
                <div className="md:col-span-2">
                  {currentNoteId ? (
                    <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 h-96">
                      <NotesEditor />
                    </div>
                  ) : (
                    <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 text-center text-gray-400">
                      <p>Select a note to edit or create a new one</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;
