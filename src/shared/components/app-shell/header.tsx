import logo from '@/assets/logo.png';
import { useQuery } from 'convex/react';
import { Link } from 'react-router';
import { api } from '../../../../convex/_generated/api';
import { UserMenu } from './user-menu';

export function Header() {
  const user = useQuery(api.users.getCurrentUser);
  return (
    <header className="shadow-sm py-4">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-900">
              <Link to="/">
                <img src={logo} alt="logo" className="h-16 w-24" />
              </Link>
            </span>
          </div>

          <div>
            <UserMenu>Hello {user?.name} </UserMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
