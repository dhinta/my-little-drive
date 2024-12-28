import { Button } from '@/vendors/ui/button';
import { Folder, House, Plus, Users } from 'lucide-react';
import { Link } from 'react-router';

export function Sidebar() {
  return (
    <div className="w-1/5 p-4 shadow-sm">
      <Button className="text-lg px-6">
        <Plus size={28} />
        New
      </Button>
      <ul className="mt-4">
        <li className="mb-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg hover:text-theme-blue"
          >
            <House size={24} />
            Home
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg hover:text-theme-blue"
          >
            <Folder size={24} />
            My Drive
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg hover:text-theme-blue"
          >
            <Users size={24} />
            Shared with me
          </Link>
        </li>
      </ul>
    </div>
  );
}
