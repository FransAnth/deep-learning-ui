import { useMutation } from "@tanstack/react-query";
import { Circle, Divide, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { triggerAiMove } from "../../services/tic-tac-toe-services";
import Modal from "../modals";

const PlayingBoard = () => {
  // const [playersTurn, setPlayersTurn] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [resultModalOpen, setResultModalOpen] = useState<any>({
    message: "",
    subMessage: "",
    isOpen: false,
  });
  const [boardState, setBoardState] = useState<any>({
    state: "ongoing",
    player: null,
    boardCombination: null,
  });
  const [boards, setBoard] = useState<any>([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const winningPositions = [
    // Horizontal Wins
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // Vertical Wins
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // Diagonal Wins
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkGameState = (board: any, player: any) => {
    // Check for a win
    for (const winCombo of winningPositions) {
      if (winCombo.every((index) => board[index] === player)) {
        console.log("Win", winCombo);
        return {
          state: "win",
          player: player,
          boardCombination: winCombo,
        };
      }
    }

    // Check for a loss (opponent wins)
    const opponent = player === 1 ? -1 : 1;
    for (const loseCombo of winningPositions) {
      if (loseCombo.every((index) => board[index] === opponent)) {
        return {
          state: "lose",
          player: player,
          boardCombination: loseCombo,
        };
      }
    }

    // Check for a draw (full board, no winner)
    if (!board.includes(0)) {
      return { state: "draw", player: player, boardCombination: null };
    }

    return { state: "ongoing", player: player, boardCombination: null };
  };

  const { mutate: getAiMove } = useMutation({
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
      const gameState = checkGameState(currBoards, 1);
      setBoardState(gameState);
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
    if (startGame == false) {
      console.log("AI MOVES");
      getAiMove(boards);
    }
    setStartGame(true);
  };

  const restartGame = (clearOnly: boolean) => {
    setBoard([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    setBoardState({
      state: "ongoing",
      player: null,
      boardCombination: null,
    });
    setResultModalOpen({ message: "", isOpen: false });
    setStartGame(false);
  };

  const updateUserMove = (index: number) => {
    let currBoards = [...boards];
    if (currBoards[index] == 0 && startGame) {
      currBoards = currBoards.map((board: any, i: number) =>
        i == index ? -1 : board
      );
      setBoard(currBoards);
      const gameState = checkGameState(currBoards, -1);
      setBoardState(gameState);

      console.log("boardState", gameState.state == "ongoing");
      if (boards.includes(0) && gameState.state == "ongoing") {
        getAiMove(boards);
      }
    }
  };

  useEffect(() => {
    if (boardState.state == "draw") {
      setResultModalOpen({
        message: "🤝 Draw",
        subMessage: "It’s a tie! Great battle!",
        isOpen: true,
      });
    } else if (boardState.state != "ongoing") {
      switch (boardState.player) {
        case -1:
          setResultModalOpen({
            message: "🏆 You win!",
            subMessage: "You crushed it! Champion vibes!",
            isOpen: true,
          });
          return;
        case 1:
          setResultModalOpen({
            message: "🎉 TicTacPro Wins!",
            subMessage: "TicTacPro takes the victory! Better luck next time!",
            isOpen: true,
          });
          return;
        default:
          return;
      }
    }
  }, [boardState]);

  return (
    <div className="flex flex-col gap-4 w-fit">
      <div className="flex flex-row w-full">
        <div className="grid grid-cols-3 gap-2">
          {boards.map((board: any, index: number) => {
            const isWinningCell = boardState.boardCombination?.includes(index);

            return (
              <div
                key={index}
                className={`w-30 h-30 ${
                  isWinningCell ? "bg-[#FFD700]" : "bg-primary"
                }`}
              >
                <button
                  className={`flex justify-center items-center cursor-pointer w-full h-full ${
                    startGame && !isWinningCell ? "hover:bg-primaryBgHover" : ""
                  } `}
                  onClick={() => updateUserMove(index)}
                  disabled={boardState.state != "ongoing"}
                >
                  {assignBoardDisplay(board)}
                </button>
              </div>
            );
          })}
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
          onClick={() => restartGame(true)}
        >
          Clear Board
        </button>
      </div>

      <Modal
        title="Result"
        isOpen={resultModalOpen.isOpen}
        closeModalAction={setResultModalOpen}
        className="w-100"
        children={
          <div className="flex flex-col justify-center items-center p-4">
            <div className="flex flex-col gap-6 mt-4 items-center">
              <div className="text-center text-4xl">
                {resultModalOpen.message}
              </div>
              <div className="text-center w-60">
                {resultModalOpen.subMessage}
              </div>
            </div>
            <div className="mt-10">
              <button
                className="text-white bg-primary rounded-lg px-4 py-2 cursor-pointer"
                onClick={() => restartGame(false)}
              >
                Play Again
              </button>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default PlayingBoard;
