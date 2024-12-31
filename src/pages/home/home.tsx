import { Drive, Loader } from '@/common/components';
import { Asset, User } from '@/common/models';
import { api } from '@convex/_generated/api';
import { useQuery } from 'convex/react';
import { WelcomeMessage } from './welcome-message';

export function Home(): JSX.Element {
  const user = useQuery(api.users.getCurrentUser) as User;
  const assets = useQuery(api.assets.list) as Asset[];
  const hasData = assets && !!assets.length;

  console.log('assets', assets);

  if (!user) return <Loader />;

  return hasData ? (
    <Drive assets={assets} user={user} />
  ) : (
    <WelcomeMessage name={user?.name} />
  );
}
