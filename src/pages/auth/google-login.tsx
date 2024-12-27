import googleColor from '@/assets/google-color.svg';
import { useAuthActions } from '@convex-dev/auth/react';

export function GoogleLogin() {
  const { signIn } = useAuthActions();
  return (
    <div className="mt-4">
      <button
        className="px-4 py-2 border flex items-center justify-center w-full gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
        onClick={() => signIn('google')}
      >
        <img
          className="w-6 h-6"
          src={googleColor}
          loading="lazy"
          alt="google logo"
        />
        <span>Login with Google</span>
      </button>
    </div>
  );
}
