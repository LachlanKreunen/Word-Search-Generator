import { useNavigate } from 'react-router-dom';

export default function WinScreen() {
  const navigate = useNavigate();
  return (
    <div className="win-screen">
      <h1>You Win!</h1>
      <button onClick={() => navigate('/')}>
        Play Again
      </button>
    </div>
  );
}
