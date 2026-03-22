import { useState, useEffect } from "react";

function Pomodoro() {
  const [time, setTime] = useState(1500);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [running]);

  const format = (t) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="text-center">
      <h3 className="text-lg font-semibold">Focus Timer</h3>
      <p className="text-3xl my-2">{format(time)}</p>

      <button
        onClick={() => setRunning(!running)}
        className="bg-green-500 text-white px-3 py-1 rounded"
      >
        {running ? "Pause" : "Start"}
      </button>
    </div>
  );
}

export default Pomodoro;