import PlayingBoard from "../components/tic-tac-toe/playing-board";

const TicTacToe = () => {
  return (
    <div className="h-fit flex flex-col p-10">
      <div className="flex flex-col gap-4">
        <div className="text-4xl">TicTacPro</div>
        <div className="">
          <div className="w-1/2">
            I am TicTacPro, an advanced AI trained in the art of Tic-Tac-Toe,
            powered by a neural network. I’ve studied countless games, analyzed
            every possible move, and honed my strategy to perfection. Some say
            I’m unbeatable... but are you the one to prove them wrong? 😏
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center mt-20">
        <PlayingBoard />
      </div>
    </div>
  );
};

export default TicTacToe;
