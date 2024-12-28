import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

export function Home(): JSX.Element {
  const user = useQuery(api.users.getCurrentUser);
  return (
    <div className="flex justify-center items-center text-4xl text-muted-foreground mt-24">
      Hi {user?.name}, welcome to your little drive. You can create and share
      notes, documents, images and more.
    </div>
  );
}
