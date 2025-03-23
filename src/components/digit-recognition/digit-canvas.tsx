import { Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface IDigitCanvas {
  style?: string;
  mode?: string;
  getGrayScale: (data: any) => void;
}

export default function DigitCanvas({
  style,
  mode,
  getGrayScale,
}: IDigitCanvas) {
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<any>(null);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const digitPixels = 56;
  const brushSize = 4;

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
      const grayscale = imageData[i];
      grayscaleValues.push(grayscale);
    }

    getGrayScale(grayscaleValues.join(","));
    if (mode == "train") {
      clearCanvas();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, digitPixels, digitPixels);
  };

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === " " && !event.target.tagName.match(/INPUT|TEXTAREA/)) {
        event.preventDefault(); // Prevent space from scrolling the page
        getGrayscaleValues();
      } else if (event.key === "Escape") {
        clearCanvas();
        getGrayScale(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [getGrayscaleValues, clearCanvas]);

  return (
    <div className={`w-80 ${style}`}>
      <div className="flex justify-center pb-2">Canvas</div>
      <div className="flex flex-col gap-4">
        <canvas
          ref={canvasRef}
          width={digitPixels}
          height={digitPixels}
          className={`border border-gray-500 cursor-crosshair bg-black w-[${digitPixels}px] h-[${digitPixels}px] image-rendering-pixelated`}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={draw}
        ></canvas>

        <div className="flex gap-10 justify-center">
          <button
            onClick={getGrayscaleValues}
            className="px-4 py-2 bg-primary text-white rounded cursor-pointer"
          >
            {mode == "train" ? "Add" : "Recognize"}
          </button>
          <button
            onClick={() => {
              clearCanvas();
              getGrayScale(null);
            }}
            className="px-4 py-2 bg-warning text-white rounded cursor-pointer"
          >
            <Trash2 />
          </button>
        </div>
      </div>
    </div>
  );
}
