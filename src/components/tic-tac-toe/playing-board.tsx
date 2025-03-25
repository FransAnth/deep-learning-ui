import { useMutation } from "@tanstack/react-query";
import { Circle, DivideIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { triggerAiMove } from "../../services/tic-tac-toe-services";
import Loader from "../global/loader";

const PlayingBoard = (props: any) => {
  // const [playersTurn, setPlayersTurn] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [boards, setBoard] = useState<any>([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const { isLoading: gettingAiMove, mutate: getAiMove } = useMutation({
    mutationFn: triggerAiMove,
    onSuccess: (moveResponse: any) => {
      const { modelPrediction } = moveResponse;
      let currBoards = [...boards];

      let modelPredictionWrong = false;
      currBoards = currBoards.map((board: any, i: number) => {
        if (i == modelPrediction) {
          if (board == 0) {
            return 1;
          } else {
            modelPredictionWrong = true;
            return board;
          }
        } else {
          return board;
        }
      });

      if (modelPredictionWrong) {
        let indexToChange = currBoards.indexOf(0);
        currBoards[indexToChange] = 1;
      }

      console.log(currBoards);

      setBoard(currBoards);
    },
  });

  const assignBoardDisplay = (state: number) => {
    switch (state) {
      case 1:
        return <XIcon size={80} />;
      case -1:
        return <Circle size={80} />;
      default:
        return "";
    }
  };

  const startTheGame = () => {
    setStartGame(true);
    getAiMove(boards);
  };

  const updateUserMove = (index: number) => {
    let currBoards = [...boards];
    if (currBoards[index] == 0 && startGame) {
      currBoards = currBoards.map((board: any, i: number) =>
        i == index ? -1 : board
      );
      setBoard(currBoards);

      if (boards.includes(0)) {
        getAiMove(boards);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 w-fit">
      <div className="flex flex-row w-full">
        <div className="grid grid-cols-3 gap-2">
          {boards.map((board: any, index: number) => (
            <div key={index} className="bg-primary w-30 h-30 ">
              <button
                className={`flex justify-center items-center cursor-pointer w-full h-full ${
                  startGame ? "hover:bg-primaryBgHover" : ""
                } `}
                onClick={() => updateUserMove(index)}
              >
                {assignBoardDisplay(board)}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-6">
        <button
          className="bg-primary px-4 py-2 rounded-lg text-white cursor-pointer"
          onClick={startTheGame}
        >
          Start Game
        </button>
        <button
          className="bg-warning px-4 py-2 rounded-lg text-white cursor-pointer"
          onClick={() => setBoard([0, 0, 0, 0, 0, 0, 0, 0, 0])}
        >
          Clear Board
        </button>
      </div>
    </div>
  );
};

export default PlayingBoard;
