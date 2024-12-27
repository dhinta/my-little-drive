import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/vendors/ui/card';

import googleColor from '@/assets/google-color.svg';
import logo from '@/assets/logo.png';
import { Github } from 'lucide-react';

export function Login() {
  return (
    <div className="flex h-screen items-center justify-center text-xl">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="flex items-center justify-center">
            <img src={logo} alt="logo" className="h-24 w-30" />
          </CardTitle>
          <CardDescription className="text-center text-sm pt-4">
            Welcome! Please login to your little drive, where you can create and
            share notes, documents.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <button
              type="button"
              className="py-2 px-4 max-w-md flex justify-center items-center bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            >
              <Github className="mr-2" />
              Sign in with GitHub
            </button>
          </div>

          <div className="mt-4">
            <button className="px-4 py-2 border flex items-center justify-center w-full gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
              <img
                className="w-6 h-6"
                src={googleColor}
                loading="lazy"
                alt="google logo"
              />
              <span>Login with Google</span>
            </button>
          </div>
        </CardContent>
        <CardFooter className="text-sm">
          <div>
            By signing in, you agree to our{' '}
            <a href="#" className="text-blue-600">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-600">
              Privacy Policy
            </a>
            .
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
