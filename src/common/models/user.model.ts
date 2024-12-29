export interface User {
  _id: string;
  name?: string;
  email?: string;
  image?: string;
  emailVerificationTime?: number;
  googleId?: string;
  githubId?: string;
}
