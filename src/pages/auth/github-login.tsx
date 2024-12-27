import { useAuthActions } from '@convex-dev/auth/react';
import { Github } from 'lucide-react';

export function GithubLogin() {
  const { signIn } = useAuthActions();
  return (
    <div>
      <button
        type="button"
        className="py-2 px-4 max-w-md flex justify-center items-center bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
        onClick={() => signIn('github')}
      >
        <Github className="mr-2" />
        Sign in with GitHub
      </button>
    </div>
  );
}
