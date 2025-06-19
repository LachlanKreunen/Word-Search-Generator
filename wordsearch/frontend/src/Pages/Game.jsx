import { useState, useMemo } from "react";         
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";

export default function Game() {
  const { state } = useLocation(); //Getting the information generated in the generate page
  const { gridSize, wordsList, output } = state;
  const navigate = useNavigate();

  //split data into the puzzle and solution matrix
  const allLines = output.trim().split("\n");
  const gridLines = allLines.slice(0, Number(gridSize));
  const solution = allLines.slice(
    Number(gridSize),
    Number(gridSize) * 2
  );
  const grid = gridLines.map((line) => line.trim().split(/\s+/));

  //Track user selection
  const [inputGrid, setInputGrid] = useState(() =>
    Array.from({ length: Number(gridSize) }, () =>
      Array(Number(gridSize)).fill(false)
    )
  );


  const answerGrid = solution.map((line) => line.trim().split(/\s+/));

  //change the x into the true values for a boolean matrix
  const solutionGrid = useMemo(
    () =>
      answerGrid.map((row) => row.map((cell) => cell === "X")),
    [answerGrid]
  );


  // toggle cell value and check for win to match only the correct instances
  const toggleCell = (r, c) => {

    const next = inputGrid.map((row) => row.slice());
    next[r][c] = !next[r][c];
    setInputGrid(next);


    const isExactMatch = next.every((row, i) =>
      row.every((val, j) => val === solutionGrid[i][j])
    );
    if (isExactMatch) {
      navigate("/win");
    }
  };

  return (
    <div className="game-container">
      <h3>Words to Find:</h3>
      <p>{wordsList.join(", ")}</p>

      <table className="wordsearch-table">
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  onClick={() => toggleCell(rowIndex, colIndex)}
                  className={
                    inputGrid[rowIndex][colIndex] ? "selected" : ""
                  }
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
