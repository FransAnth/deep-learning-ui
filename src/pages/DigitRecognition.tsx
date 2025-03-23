import { ArrowRightIcon, CloudAlert } from "lucide-react";
import DigitCanvas from "../components/digit-recognition/digit-canvas";
import RecognitionOutput from "../components/digit-recognition/recognition-output";
import { useNavigate } from "react-router-dom";
import { useDigitStore } from "../store/digit-recognition-store";
import { useMutation } from "@tanstack/react-query";
import { recognizeDigit } from "../services/digit-recognition-services";
import { useState } from "react";
import Modal from "../components/modals";
import Loader from "../components/global/loader";

const DigitRecognition = () => {
  const navigate = useNavigate();
  const setModelPrediction = useDigitStore((state) => state.setModelPrediction);
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);

  const goToTesting = () => {
    navigate("training");
  };

  const { isLoading: gettingDigitResponse, mutate: getDigitValue } =
    useMutation({
      mutationFn: recognizeDigit,
      onSuccess: (digit: any) => {
        setModelPrediction(digit);
      },
      onError: (error: any) => {
        console.log(error);
        setErrorModalOpen(true);
      },
    });

  const grayScaleCallback = (data: any) => {
    if (data) {
      getDigitValue({ pixels: data });
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
      {gettingDigitResponse && <Loader />}

      <Modal
        title="Error"
        isOpen={errorModalOpen}
        closeModalAction={setErrorModalOpen}
        className="w-100"
        children={
          <div className="flex flex-col items-center text-center gap-2 py-4">
            <CloudAlert size={80} className="text-red-500" />
            <div className="w-50 flex flex-col gap-2">
              <span className="text-lg">Opps!</span>
              <span className="text-sm">
                An error occurred while processing your request.
              </span>
            </div>

            <button
              className="bg-primary text-white px-4 py-2 rounded-lg cursor-pointer mt-4"
              onClick={() => setErrorModalOpen(false)}
            >
              Okay
            </button>
          </div>
        }
      />
    </div>
  );
};

export default DigitRecognition;
