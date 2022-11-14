import { useEffect, useState } from "react";
import "./App.css";
import BoardComponent from "./components/BoardComponent";
import GamebarComponent from "./components/BarComponent";
import { Board } from "./models/Board";
import { Player } from "./models/Player";
import { colors } from "./models/Colors";
import StartComponent from "./components/StartComponent";
import ReferenceComponent from "./components/ReferenceComponent";
function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [board, setBoard] = useState<Board>(new Board());
  const [whitePlayer, setWhitePlayer] = useState<Player>(
    new Player(colors.WHITE)
  );
  const [blackPlayer, setBlackPlayer] = useState<Player>(
    new Player(colors.BLACK)
  );
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  useEffect(() => {
    restart();
  }, []);

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
  }

  function swapPlayer() {
    setCurrentPlayer(
      currentPlayer?.color === colors.WHITE ? blackPlayer : whitePlayer
    );
  }

  return (
    <div className="App">
      {gameStarted ? (
        <div className="Game">
          <GamebarComponent currentPlayer={currentPlayer} board={board} />
          <BoardComponent
            board={board}
            setBoard={setBoard}
            currentPlayer={currentPlayer}
            swapPlayer={swapPlayer}
          />
        </div>
      ) : (
        <div className="w-1/6">
          <StartComponent setGameStarted={setGameStarted} />
          <ReferenceComponent />
        </div>
      )}
    </div>
  );
}

export default App;
