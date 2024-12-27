import { useAuthActions } from '@convex-dev/auth/react';
import './App.css';

function App() {
  const { signIn } = useAuthActions();
  return (
    <button onClick={() => void signIn('google')}>Sign in with Google</button>
  );
}

export default App;
