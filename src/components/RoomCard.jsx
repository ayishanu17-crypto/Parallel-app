import { Link } from "react-router-dom";

function RoomCard() {
  return (
    <div className="bg-gray-900 p-5 rounded-2xl shadow-lg hover:scale-105 transition">
      <h3 className="text-xl font-semibold mb-2">Focus Room</h3>
      <p className="text-gray-400 mb-4">12 people studying</p>
      <Link
        to="/signup"
        className="bg-green-600 px-4 py-2 rounded-lg inline-block text-center"
      >
        Join
      </Link>
    </div>
  );
}

export default RoomCard;