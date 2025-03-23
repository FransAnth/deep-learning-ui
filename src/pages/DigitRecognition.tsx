import { ArrowRightIcon } from "lucide-react";
import DigitCanvas from "../components/digit-recognition/digit-canvas";
import RecognitionOutput from "../components/digit-recognition/recognition-output";
import { useNavigate } from "react-router-dom";
import { useDigitStore } from "../store/digit-recognition-store";

const DigitRecognition = () => {
  const navigate = useNavigate();
  const setModelPrediction = useDigitStore((state) => state.setModelPrediction);

  const goToTesting = () => {
    navigate("training");
  };

  const grayScaleCallback = (data: any) => {
    if (data) {
      console.log("Testing", data);
      setModelPrediction(2);
    } else {
      setModelPrediction(null);
    }
  };

  return (
    <div className="h-fit flex flex-col p-10">
      <div className="flex justify-between">
        <div className="flex flex-col gap-4">
          <div className="text-4xl">DeepDigit</div>
          <div className="w-1/2">
            This trained Feed Forward Neural Network can identify digits from 0
            to 9. Simply draw a digit on the canvas, and the model will
            recognize and display the number for you. 🎯✨
          </div>
        </div>
        <div className="">
          <button
            onClick={goToTesting}
            className="bg-primary text-white px-4 py-0.5  cursor-pointer"
          >
            Train
          </button>
        </div>
      </div>
      <div className="flex justify-center pt-20">
        <DigitCanvas style="m-4" getGrayScale={grayScaleCallback} />
        <div className="flex flex-col justify-center px-20">
          <ArrowRightIcon size={60} />
        </div>
        <RecognitionOutput style="m-4" />
      </div>
    </div>
  );
};

export default DigitRecognition;
