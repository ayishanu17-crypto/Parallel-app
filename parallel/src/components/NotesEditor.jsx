import { useState, useRef, useEffect } from "react";
import { FaBold, FaItalic, FaUnderline } from "react-icons/fa";

function NotesEditor() {
  const [notes, setNotes] = useState("");
  const [title, setTitle] = useState("");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);

  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  // Resize canvas properly when shown
  useEffect(() => {
  if (!showCanvas) return;

  setTimeout(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;

    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#111";
  }, 0);
}, [showCanvas]);
  
  // DRAWING
  const getCoordinates = (e) => {
  const canvas = canvasRef.current;
  const rect = canvas.getBoundingClientRect();

  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
};

const startDrawing = (e) => {
  if (!canvasRef.current) return;

  isDrawing.current = true;

  const ctx = canvasRef.current.getContext("2d");
  const { x, y } = getCoordinates(e);

  ctx.beginPath();
  ctx.moveTo(x, y);
};

const draw = (e) => {
  if (!isDrawing.current || !canvasRef.current) return;

  const ctx = canvasRef.current.getContext("2d");
  const { x, y } = getCoordinates(e);

  ctx.lineTo(x, y);
  ctx.stroke();
};

const stopDrawing = () => {
  isDrawing.current = false;
};
  return (
    <div className="w-full h-full flex flex-col bg-gray-50">

      {/* HEADER */}
      <div className="px-4 py-3 bg-white border-b border-gray-200">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title..."
          className="w-full text-2xl font-semibold outline-none text-black placeholder-gray-400"
        />
      </div>

      {/* NOTES AREA */}
      <div className="flex-1 p-6 overflow-auto">
        <div
          className="w-full min-h-[400px] p-4 rounded-md"
          style={{
            backgroundImage: `repeating-linear-gradient(
              to bottom,
              transparent,
              transparent 34px,
              #e5e7eb 35px
            )`,
          }}
        >
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Start writing..."
            spellCheck={false}
            className={`w-full min-h-[400px] resize-none outline-none bg-transparent text-lg leading-9 text-black placeholder-gray-400
              ${isBold ? "font-bold" : ""}
              ${isItalic ? "italic" : ""}
              ${isUnderline ? "underline" : ""}
            `}
          />
        </div>

        {/* DRAWING BELOW NOTES */}
        {showCanvas && (
          <div className="mt-6 bg-white p-3 rounded border border-gray-200">
            <p className="text-sm mb-2 text-black">Draw here:</p>
            <canvas
              ref={canvasRef}
              className="border rounded w-full h-[200px] cursor-crosshair bg-white"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseOut={stopDrawing}
            />
          </div>
        )}
      </div>

      {/* TOOLBAR */}
      <div className="flex items-center gap-2 px-4 py-2 bg-white border-t border-gray-200">

        <button
          onClick={() => setIsBold(!isBold)}
          className={`p-2 border rounded ${
            isBold ? "bg-black text-white" : "text-black hover:bg-gray-100"
          }`}
        >
          <FaBold />
        </button>

        <button
          onClick={() => setIsItalic(!isItalic)}
          className={`p-2 border rounded ${
            isItalic ? "bg-black text-white" : "text-black hover:bg-gray-100"
          }`}
        >
          <FaItalic />
        </button>

        <button
          onClick={() => setIsUnderline(!isUnderline)}
          className={`p-2 border rounded ${
            isUnderline ? "bg-black text-white" : "text-black hover:bg-gray-100"
          }`}
        >
          <FaUnderline />
        </button>

        <button
          onClick={() => setShowCanvas(!showCanvas)}
          className="px-3 py-1 text-sm border rounded text-black hover:bg-gray-100"
        >
          ✏️ Draw
        </button>
      </div>
    </div>
  );
}

export default NotesEditor;