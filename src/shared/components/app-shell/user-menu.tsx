import { Button } from '@/vendors/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/vendors/ui/dropdown-menu';
import { useAuthActions } from '@convex-dev/auth/react';
import { CircleUserRound } from 'lucide-react';
import { ReactNode } from 'react';

export function UserMenu({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-sm font-medium">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUserRound size={28} />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{children}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <SignOutButton />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function SignOutButton() {
  const { signOut } = useAuthActions();
  return (
    <DropdownMenuItem className="p-0">
      <Button
        variant="ghost"
        className="w-full hover:bg-white px-2 flex items-center justify-start"
        onClick={() => void signOut()}
      >
        Sign out
      </Button>
    </DropdownMenuItem>
  );
}
