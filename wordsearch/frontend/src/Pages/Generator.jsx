import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import axios from "axios";

export default function Generator() {
  const navigate = useNavigate();
  const [gridSize, setGridSize] = useState("");
  const [newWord, setNewWord] = useState("");
  const [wordsList, setWordsList] = useState([]);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddWord = () => {
    const trimmed = newWord.trim().toUpperCase();
    if (trimmed.includes(" ")) {
     setErrorMessage("Words cannot contain spaces.");
     setShowErrorPopup(true);
     return;
   }
    if (trimmed === "") return;
    setWordsList([...wordsList, trimmed]);
    setNewWord("");
  };

  const runWordSearch = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/run-wordsearch",
        {
          gridSize,
          wordsList,
        }
      );
      console.log(response.data);
      return response;
    } catch (err) {
      console.error(err);
      setErrorMessage(
        "Unable to generate wordsearch — check your words or grid size."
      );
      setShowErrorPopup(true);
      setWordsList([]);
      return null;
    }
  };

  return (
    <>
      <div className="card">
        <div className="form-group">
          <label htmlFor="gridSize">Grid Size (1-20): </label>
          <input
            id="GridSize"
            type="number"
            min="1"
            max="20"
            placeholder="e.g. 10"
            value={gridSize}
            onChange={(e) => setGridSize(e.target.value)}
            className="text-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="newWord">New Word: </label>
          <div className="input-row">
            <input
              id="newWord"
              type="text"
              placeholder="e.g. banana"
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              className="text-input"
            />
            <button onClick={handleAddWord} className="text-input add-button">
              Add
            </button>
          </div>
        </div>

        {wordsList.length > 0 && (
          <div className="form-group">
            <label>Words Added:</label>
            <ul
              className="word-list"
              style={{ listStyleType: "none", paddingLeft: 0 }}
            >
              {wordsList.map((w, idx) => (
                <li key={idx}>{w}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={async () => {
            const response = await runWordSearch();
            if (!response) return;
            navigate("/game", {
              state: {
                gridSize: Number(gridSize),
                wordsList,
                output: response.data,
              },
            });
          }}
        >
          Generate
        </button>

        {showErrorPopup && (
          <div className="error-overlay">
          <div className="error-popup">
            <p className="error-message">{errorMessage}</p>
            <button
              className="error-close-button"
              onClick={() => setShowErrorPopup(false)}
            >
              Close
            </button>
          </div>
          </div>
        )}
      </div>
    </>
  );
}
