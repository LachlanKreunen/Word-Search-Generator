import { useState } from "react";         
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";

export default function Game() {
  const { state } = useLocation();
  const { gridSize, wordsList, output } = state;

  const allLines = output.trim().split("\n");
  const gridLines = allLines.slice(0, Number(gridSize));
  const solution = allLines.slice(Number(gridSize), Number(gridSize)*2);
  const grid = gridLines.map((line) => line.trim().split(/\s+/));

  const [selectedSet, setSelectedSet] = useState(new Set());

  return (
    <div className="game-container">
      <h3>Words to Find:</h3>
      <p>{wordsList.join(", ")}</p>

      <div>
        <table className="wordsearch-table">
          <tbody>
            {grid.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td key={colIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}