import { Trash2 } from "lucide-react";
import { useState, useRef } from "react";

export default function DigitCanvas() {
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<any>(null);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const digitPixels = 280;
  const brushSize = 30;

  const startDrawing = (e: any) => {
    setIsDrawing(true);
    lastPos.current = getMousePos(e);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    lastPos.current = null;
  };

  const getMousePos = (e: any) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const draw = (e: any) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pos = getMousePos(e);

    if (lastPos.current) {
      ctx.strokeStyle = "white";
      ctx.lineWidth = brushSize;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
    lastPos.current = pos;
  };

  const getGrayscaleValues = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, digitPixels, digitPixels).data;
    const grayscaleValues = [];

    for (let i = 0; i < imageData.length; i += 4) {
      const grayscale = imageData[i] / 127.5 - 1; // Scale from [0,1] to [-1,1]
      grayscaleValues.push(grayscale);
    }

    console.log(grayscaleValues);
    return grayscaleValues;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, digitPixels, digitPixels);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <canvas
        ref={canvasRef}
        width={digitPixels}
        height={digitPixels}
        className="border border-gray-500 cursor-crosshair bg-black w-[560px] h-[560px] image-rendering-pixelated"
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
      ></canvas>
      <div className="flex gap-10">
        <button
          onClick={getGrayscaleValues}
          className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
        >
          Predict Digit
        </button>
        <button
          onClick={clearCanvas}
          className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
        >
          <Trash2 />
        </button>
      </div>
    </div>
  );
}
