import { useEffect, useState } from "react";
import "./App.css";
import BoardComponent from "./components/BoardComponent";
import AppbarComponent from "./components/AppbarComponent";
import GamebarComponent from "./components/GamebarComponent";
import { Board } from "./models/Board";

function App() {
  const [board, setBoard] = useState<Board>(new Board());

  useEffect(() => {
    restart();
  }, []);

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    console.log(newBoard);
    setBoard(newBoard);
  }
  return (
    <div className="App">
      <AppbarComponent />
      <BoardComponent board={board} setBoard={setBoard} />
      <GamebarComponent />
    </div>
  );
}

export default App;
