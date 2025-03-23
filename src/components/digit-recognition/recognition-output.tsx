import {
  Digit0,
  Digit1,
  Digit2,
  Digit3,
  Digit4,
  Digit5,
  Digit6,
  Digit7,
  Digit8,
  Digit9,
} from "../../assets";
import { useDigitStore } from "../../store/digit-recognition-store";

interface IDigitCanvas {
  style?: string;
}

const RecognitionOutput = ({ style }: IDigitCanvas) => {
  const predictedNumber = useDigitStore((state) => state.modelPrediction);

  const getDigitImage = (digit: any) => {
    if (predictedNumber != null) {
      const imagePaths = [
        Digit0,
        Digit1,
        Digit2,
        Digit3,
        Digit4,
        Digit5,
        Digit6,
        Digit7,
        Digit8,
        Digit9,
      ];

      return <img className="p-20" src={imagePaths[digit]} />;
    }
  };

  return (
    <div className={style}>
      <div className="flex justify-center pb-2">Output</div>
      <div className="flex bg-primary w-80 h-80 justify-center items-center">
        {getDigitImage(Number(predictedNumber))}
      </div>
      <div className="flex justify-center p-4">
        {predictedNumber != null
          ? `The Digit is ${predictedNumber} 😊`
          : "I'm all set to recognize your digit! ✨"}
      </div>
    </div>
  );
};

export default RecognitionOutput;
