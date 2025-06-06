import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../App.css'

export default function Generator() {
    const navigate = useNavigate();
    const [gridSize, setGridSize] = useState('')
    const [newWord, setNewWord] = useState('')
    const [wordsList, setWordsList] = useState([])

    const handleAddWord = () => {
        const trimmed = newWord.trim().toUpperCase()
        if (trimmed === '') return
        setWordsList([...wordsList, trimmed])
        setNewWord('')

    }

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
                    <ul className="word-list" style={{ listStyleType: 'none', paddingLeft: 0}}>
                        {wordsList.map((w, idx) => (
                        <li key={idx}>{w}</li>
                    ))}
                    </ul>
                </div>
            )}
            
            <button onClick={() => navigate('/game')}>
            Generate
            </button>
        </div>
        </>
    )
}
