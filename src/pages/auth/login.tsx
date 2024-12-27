import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/vendors/ui/card';

import logo from '@/assets/logo.png';
import { GithubLogin } from './github-login';
import { GoogleLogin } from './google-login';

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
          <GithubLogin />
          <GoogleLogin />
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
